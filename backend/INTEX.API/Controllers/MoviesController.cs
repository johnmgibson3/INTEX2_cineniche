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
    private readonly ILogger<MoviesController> _logger;
    private readonly MoviesContext _context;

    public MoviesController(MoviesContext context, ILogger<MoviesController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet("All")]
    public async Task<IActionResult> GetAllMovies()
    {
        try
        {
            await using var context = new MoviesContext();  // or use dependency injection properly
            var movies = await context.MoviesTitles.ToListAsync();
            return Ok(movies);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching movies");
            return StatusCode(500, "Internal server error. Please try again later.");
        }
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
        // Get the highest existing showId (like "s42")
        var ids = _context.MoviesTitles
            .Select(m => m.ShowId)
            .ToList() // brings it into memory so we can use C# features
            .Where(id => id.StartsWith("s") && int.TryParse(id.Substring(1), out _)) // now allowed
            .Select(id => int.Parse(id.Substring(1)))
            .OrderByDescending(num => num)
            .ToList();

        var lastId = ids.FirstOrDefault();


        // Generate next ID (e.g., "s43")
        var nextId = $"s{lastId + 1}";

        newMovie.ShowId = nextId;

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
