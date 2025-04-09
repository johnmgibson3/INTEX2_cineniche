using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using INTEX.API.Models;
using Microsoft.AspNetCore.Authorization;

namespace INTEX.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly MoviesContext _context;

    public MoviesController(MoviesContext context)
    {
        _context = context;
    }

    [HttpGet("All")]
    public async Task<IActionResult> GetAllMovies()
    {
        var movies = await _context.MoviesTitles.ToListAsync();
        return Ok(movies);
    }


    [HttpGet("{showId}")]
    public IActionResult Get(string showId)
    {
        var movie = _context.MoviesTitles.Find(showId);
        if (movie == null) return NotFound(new { message = "Movie not found" });

        return Ok(movie);
    }

    [HttpPost("Add")]
    public IActionResult Add([FromBody] MoviesTitle newMovie)
    {
        _context.MoviesTitles.Add(newMovie);
        _context.SaveChanges();
        return Ok(newMovie);
    }

    [HttpPut("Update/{showId}")]
    public IActionResult Update(string showId, [FromBody] MoviesTitle updated)
    {
        var movie = _context.MoviesTitles.Find(showId);
        if (movie == null) return NotFound(new { message = "Movie not found" });

        _context.Entry(movie).CurrentValues.SetValues(updated);
        _context.SaveChanges();

        return Ok(movie);
    }

    [HttpDelete("Delete/{showId}")]
    public IActionResult Delete(string showId)
    {
        var movie = _context.MoviesTitles.Find(showId);
        if (movie == null) return NotFound(new { message = "Movie not found" });

        _context.MoviesTitles.Remove(movie);
        _context.SaveChanges();
        return NoContent();
    }
    
}
