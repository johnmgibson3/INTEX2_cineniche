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
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MoviesRating>>> GetRatings()
    {
        return await _context.MoviesRatings.ToListAsync();
    }

    // GET: api/Ratings/{userId}/{showId}
    [HttpGet("{userId}/{showId}")]
    public async Task<ActionResult<MoviesRating>> GetRating(int userId, int showId)
    {
        var rating = await _context.MoviesRatings.FindAsync(userId, showId);

        if (rating == null)
        {
            return NotFound();
        }

        return rating;
    }
}
