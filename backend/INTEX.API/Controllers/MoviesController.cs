using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using INTEX.API.Models;

namespace INTEX.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly MoviesContext _context;

        public MoviesController(MoviesContext context)
        {
            _context = context;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MoviesTitle>>> GetMovies()
        {
            return await _context.MoviesTitles.ToListAsync();
        }

        // GET: api/Movies/s1234
        [HttpGet("{id}")]
        public async Task<ActionResult<MoviesTitle>> GetMovie(string id)
        {
            var movie = await _context.MoviesTitles.FindAsync(id);

            if (movie == null)
                return NotFound();

            return movie;
        }

        // POST: api/Movies
        [HttpPost]
        public async Task<ActionResult<MoviesTitle>> PostMovie(MoviesTitle movie)
        {
            _context.MoviesTitles.Add(movie);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMovie), new { id = movie.ShowId }, movie);
        }
    }
}
