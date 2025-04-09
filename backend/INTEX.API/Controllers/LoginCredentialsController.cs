using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using INTEX.API.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace INTEX.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginCredentialsController : ControllerBase
{
    private readonly MoviesContext _context;
    private readonly UserManager<LoginCredentials> _userManager;

    public LoginCredentialsController(
        MoviesContext context,
        UserManager<LoginCredentials> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet("All")]
    public IActionResult GetAll(int pageSize = 10, int pageNum = 1)
    {
        var totalCount = _context.LoginCredentials.Count();
        var credentials = _context.LoginCredentials
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();
        return Ok(new { Credentials = credentials, TotalCount = totalCount });
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> Get(string userId)
    {
        var cred = await _userManager.FindByIdAsync(userId);
        if (cred == null) return NotFound(new { message = "Credentials not found" });
        return Ok(cred);
    }

    [HttpPost("Add")]
    public async Task<IActionResult> Add([FromBody] LoginCredentials newCred)
    {
        // Use UserManager to create users with proper password hashing
        var result = await _userManager.CreateAsync(newCred, "TemporaryPassword123!");

        if (result.Succeeded)
        {
            return Ok(newCred);
        }

        return BadRequest(result.Errors);
    }

    [HttpPut("Update/{userId}")]
    public async Task<IActionResult> Update(string userId, [FromBody] LoginCredentials updated)
    {
        var existing = await _userManager.FindByIdAsync(userId);
        if (existing == null) return NotFound(new { message = "Credentials not found" });

        // Update user properties
        existing.UserName = updated.UserName;
        existing.PhoneNumber = updated.PhoneNumber;
        existing.AdminStatus = updated.AdminStatus;
        // Add other properties as needed

        var result = await _userManager.UpdateAsync(existing);

        if (result.Succeeded)
        {
            return Ok(existing);
        }

        return BadRequest(result.Errors);
    }

    [HttpDelete("Delete/{userId}")]
    public async Task<IActionResult> Delete(string userId)
    {
        var cred = await _userManager.FindByIdAsync(userId);
        if (cred == null) return NotFound(new { message = "Credentials not found" });

        var result = await _userManager.DeleteAsync(cred);

        if (result.Succeeded)
        {
            return NoContent();
        }

        return BadRequest(result.Errors);
    }


}