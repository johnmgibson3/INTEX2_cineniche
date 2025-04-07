using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using INTEX.API.Models;

namespace INTEX.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly MoviesContext _context;

        public UsersController(MoviesContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MoviesUser>>> GetUsers()
        {
            return await _context.MoviesUsers.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MoviesUser>> GetUser(int id)
        {
            var user = await _context.MoviesUsers.FindAsync(id);

            if (user == null)
                return NotFound();

            return user;
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<MoviesUser>> PostUser(MoviesUser user)
        {
            _context.MoviesUsers.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
        }
    }
}
