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
    public IActionResult GetAllRatings(int pageSize = 10, int pageNum = 1, [FromQuery] int? userId = null)
    {
        var query = _context.MoviesRatings.AsQueryable();

        if (userId.HasValue)
        {
            query = query.Where(r => r.UserId == userId);
        }

        var totalCount = query.Count();

        var ratings = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(new
        {
            Ratings = ratings,
            TotalCount = totalCount
        });
    }

    // GET: api/Ratings/1/s123
    [HttpGet("{userId}/{showId}")]
    public IActionResult GetRating(int userId, string showId)
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
        _context.MoviesRatings.Add(newRating);
        _context.SaveChanges();

        return Ok(newRating);
    }

    // PUT: api/Ratings/1/s123
    [HttpPut("Update/{userId}/{showId}")]
    public IActionResult UpdateRating(int userId, string showId, [FromBody] MoviesRating updatedRating)
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

    // DELETE: api/Ratings/Delete/1/s123
    [HttpDelete("Delete/{userId}/{showId}")]
    public IActionResult DeleteRating(int userId, string showId)
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
