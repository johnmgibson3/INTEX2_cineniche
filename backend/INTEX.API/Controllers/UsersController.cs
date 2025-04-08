using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using INTEX.API.Models;

namespace INTEX.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly MoviesContext _context;

    public UsersController(MoviesContext context)
    {
        _context = context;
    }

    [HttpGet("All")]
    public IActionResult GetAll(int pageSize = 10, int pageNum = 1)
    {
        var totalCount = _context.MoviesUsers.Count();

        var users = _context.MoviesUsers
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(new { Users = users, TotalCount = totalCount });
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var user = _context.MoviesUsers.Find(id);
        if (user == null) return NotFound(new { message = "User not found" });

        return Ok(user);
    }

    [HttpPost("Add")]
    public IActionResult Add([FromBody] MoviesUser newUser)
    {
        _context.MoviesUsers.Add(newUser);
        _context.SaveChanges();
        return Ok(newUser);
    }

    [HttpPut("Update/{id}")]
    public IActionResult Update(int id, [FromBody] MoviesUser updatedUser)
    {
        var user = _context.MoviesUsers.Find(id);
        if (user == null) return NotFound(new { message = "User not found" });

        _context.Entry(user).CurrentValues.SetValues(updatedUser);
        _context.SaveChanges();

        return Ok(user);
    }

    [HttpDelete("Delete/{id}")]
    public IActionResult Delete(int id)
    {
        var user = _context.MoviesUsers.Find(id);
        if (user == null) return NotFound(new { message = "User not found" });

        _context.MoviesUsers.Remove(user);
        _context.SaveChanges();
        return NoContent();
    }
}
