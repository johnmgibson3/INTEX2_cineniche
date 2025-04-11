using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using INTEX.API.Models;

namespace INTEX.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RatingsController : ControllerBase
{
    private readonly MoviesContext _context;

    public RatingsController(MoviesContext context)
    {
        _context = context;
    }

    // GET: api/Ratings
    [HttpGet("All")]
    public IActionResult GetAllRatings([FromQuery] string userId = null)
    {
        var query = _context.MoviesRatings.AsQueryable();

        if (!string.IsNullOrEmpty(userId))
        {
            query = query.Where(r => r.UserId == userId);
        }

        var totalCount = query.Count();
        var ratings = query
            .ToList();

        return Ok(new
        {
            Ratings = ratings,
            TotalCount = totalCount
        });
    }

    // GET: api/Ratings/Average/s123
    [HttpGet("Average/{showId}")]
    public IActionResult GetAverageRating(string showId)
    {
        var ratings = _context.MoviesRatings
            .Where(r => r.ShowId == showId)
            .Select(r => (double)r.Rating); // ensure double to avoid integer division

        if (!ratings.Any())
        {
            return Ok(new { average = (double?)null }); // return null to indicate no ratings
        }

        double average = ratings.Average();
        double rounded = Math.Round(average, 1, MidpointRounding.AwayFromZero);
        return Ok(new { average = rounded });
    }











    // GET: api/Ratings/abc123/s123
    [HttpGet("{userId}/{showId}")]
    public IActionResult GetRating(string userId, string showId)
    {
        var rating = _context.MoviesRatings.Find(userId, showId);
        if (rating == null)
        {
            return NotFound(new { message = "Rating not found" });
        }
        return Ok(rating);
    }

    // POST: api/Ratings
    [HttpPost("Add")]
    public IActionResult AddRating([FromBody] MoviesRating newRating)
    {
        Console.WriteLine("🚀 AddRating endpoint hit.");

        if (newRating == null)
        {
            Console.WriteLine("⚠️ newRating is null!");
            return BadRequest("Invalid rating payload.");
        }

        try
        {
            var existing = _context.MoviesRatings.Find(newRating.UserId, newRating.ShowId);

            if (existing != null)
            {
                Console.WriteLine("🔁 Updating existing rating.");
                existing.Rating = newRating.Rating;
                _context.Entry(existing).State = EntityState.Modified; // 🔥 This line makes the update work
            }
            else
            {
                Console.WriteLine("✨ Adding new rating.");
                _context.MoviesRatings.Add(newRating);
            }

            _context.SaveChanges();
            Console.WriteLine("✅ SaveChanges successful.");
            return Ok(newRating);
        }
        catch (Exception ex)
        {
            Console.WriteLine("❌ Error in AddRating: " + ex.Message);
            return StatusCode(500, new { message = "Server error", error = ex.Message });
        }
    }


    // PUT: api/Ratings/abc123/s123
    [HttpPut("Update/{userId}/{showId}")]
    public IActionResult UpdateRating(string userId, string showId, [FromBody] MoviesRating updatedRating)
    {
        var existing = _context.MoviesRatings.Find(userId, showId);
        if (existing == null)
        {
            return NotFound(new { message = "Rating not found" });
        }
        existing.Rating = updatedRating.Rating;
        _context.MoviesRatings.Update(existing);
        _context.SaveChanges();
        return Ok(existing);
    }

    // DELETE: api/Ratings/Delete/abc123/s123
    [HttpDelete("Delete/{userId}/{showId}")]
    public IActionResult DeleteRating(string userId, string showId)
    {
        var rating = _context.MoviesRatings.Find(userId, showId);
        if (rating == null)
        {
            return NotFound(new { message = "Rating not found" });
        }
        _context.MoviesRatings.Remove(rating);
        _context.SaveChanges();
        return NoContent();
    }
}