using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using INTEX.API.Models;
using INTEX.API.Models.DTOs;  // Make sure this namespace points to where you put your DTOs
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace INTEX.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<LoginCredentials> _userManager;
        private readonly SignInManager<LoginCredentials> _signInManager;
        private readonly MoviesContext _context;
        public AuthController(
            UserManager<LoginCredentials> userManager,
            SignInManager<LoginCredentials> signInManager,
            MoviesContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Create Identity user. You can capture Email, Username, etc.
            var user = new LoginCredentials
            {
                UserName = model.Username,
                // Optionally, store email if you want; adjust LoginCredentials accordingly.
                // Email = model.Email,
                AdminStatus = false  // default setting for a new user
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            // Create a corresponding MoviesUser entry
            // Assumes that MoviesContext is injected if needed; if your MoviesContext is the same as your Identity context, use that.
            var moviesUser = new MoviesUser
            {
                UserId = user.Id,  // link using the same ID
                Name = model.Username,  // or collect a full name separately if desired
                Email = model.Email,
                // Set other fields as needed; you can leave them null or assign default values
            };

            // Assuming _context is injected in the controller:
            _context.MoviesUsers.Add(moviesUser);
            await _context.SaveChangesAsync();


            // Optionally, sign in immediately after registration
            //await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(new { message = "Registration successful." });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
                return Unauthorized(new { message = "Invalid credentials." });

            var isValidPassword = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!isValidPassword)
                return Unauthorized(new { message = "Invalid credentials." });

            // ✅ Optional: Manually sign in user if you want cookie-based auth
            var identity = new ClaimsIdentity(
                new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName ?? "")
                },
                IdentityConstants.ApplicationScheme
            );

            var principal = new ClaimsPrincipal(identity);
            await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, principal);

            return Ok(new { message = "Login successful." });

        }


       [HttpPost("logout")]
        [AllowAnonymous]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();

            // Delete the authentication cookie with options matching its creation (no Domain specified)
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Path = "/"  // This should match the original cookie's path
            };

            Response.Cookies.Delete(".AspNetCore.Identity.Application", cookieOptions);
            return Ok(new { message = "Logout successful." });
        }


        //[Authorize]
        //[HttpGet("me")]
        //public async Task<IActionResult> Me()
        //{
        //    var user = await _userManager.GetUserAsync(User);
        //    if (user == null)
        //        return Unauthorized();

        //    return Ok(new
        //    {
        //        username = user.UserName,
        //        isAdmin = user.AdminStatus // 🔥 This is your custom admin check
        //    });
        //}

        // In AuthController.cs - Ensure the "me" endpoint returns the userId
        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized();

            return Ok(new
            {
                id = user.Id,
                username = user.UserName,
                isAdmin = user.AdminStatus // If applicable
            });
        }

    }
}
