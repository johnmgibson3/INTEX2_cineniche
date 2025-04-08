using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using INTEX.API.Models;

namespace INTEX.API.Controllers;

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
    public IActionResult GetAll(int pageSize = 10, int pageNum = 1)
    {
        var totalCount = _context.MoviesTitles.Count();

        var movies = _context.MoviesTitles
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(new { Movies = movies, TotalCount = totalCount });
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
