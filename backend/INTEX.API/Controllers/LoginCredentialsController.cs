using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using INTEX.API.Models;

namespace INTEX.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginCredentialsController : ControllerBase
{
    private readonly MoviesContext _context;

    public LoginCredentialsController(MoviesContext context)
    {
        _context = context;
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
    public IActionResult Get(int userId)
    {
        var cred = _context.LoginCredentials.Find(userId);
        if (cred == null) return NotFound(new { message = "Credentials not found" });

        return Ok(cred);
    }

    [HttpPost("Add")]
    public IActionResult Add([FromBody] LoginCredentials newCred)
    {
        _context.LoginCredentials.Add(newCred);
        _context.SaveChanges();
        return Ok(newCred);
    }

    [HttpPut("Update/{userId}")]
    public IActionResult Update(int userId, [FromBody] LoginCredentials updated)
    {
        var existing = _context.LoginCredentials.Find(userId);
        if (existing == null) return NotFound(new { message = "Credentials not found" });

        _context.Entry(existing).CurrentValues.SetValues(updated);
        _context.SaveChanges();

        return Ok(existing);
    }

    [HttpDelete("Delete/{userId}")]
    public IActionResult Delete(int userId)
    {
        var cred = _context.LoginCredentials.Find(userId);
        if (cred == null) return NotFound(new { message = "Credentials not found" });

        _context.LoginCredentials.Remove(cred);
        _context.SaveChanges();
        return NoContent();
    }
}
