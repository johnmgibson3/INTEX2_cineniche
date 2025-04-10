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
            var movies = await _context.MoviesTitles.ToListAsync();
            return Ok(movies);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching movies");
            return StatusCode(500, "Internal server error. Please try again later.");
        }
    }

    [HttpGet("ByGenre/{genreKey}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetMoviesByGenre(string genreKey)
    {
        try
        {
            // Normalize key (match your C# property names, which are PascalCase)
            var genreProperty = genreKey switch
            {
                "action" => "Action",
                "animeSeriesInternationalTvShows" => "AnimeSeriesInternationalTvShows",
                "britishTvShowsDocuseriesInternationalTvShows" => "BritishTvShowsDocuseriesInternationalTvShows",
                "children" => "Children",
                "comedies" => "Comedies",
                "comediesDramasInternationalMovies" => "ComediesDramasInternationalMovies",
                "comediesInternationalMovies" => "ComediesInternationalMovies",
                "comediesRomanticMovies" => "ComediesRomanticMovies",
                "crimeTvShowsDocuseries" => "CrimeTvShowsDocuseries",
                "documentaries" => "Documentaries",
                "documentariesInternationalMovies" => "DocumentariesInternationalMovies",
                "docuseries" => "Docuseries",
                "dramas" => "Dramas",
                "dramasInternationalMovies" => "DramasInternationalMovies",
                "dramasRomanticMovies" => "DramasRomanticMovies",
                "familyMovies" => "FamilyMovies",
                "fantasy" => "Fantasy",
                "horrorMovies" => "HorrorMovies",
                "internationalMoviesThrillers" => "InternationalMoviesThrillers",
                "internationalTvShowsRomanticTvShowsTvDramas" => "InternationalTvShowsRomanticTvShowsTvDramas",
                "kidsTv" => "KidsTv",
                "languageTvShows" => "LanguageTvShows",
                "musicals" => "Musicals",
                "natureTv" => "NatureTv",
                "realityTv" => "RealityTv",
                "spirituality" => "Spirituality",
                "tvAction" => "TvAction",
                "tvComedies" => "TvComedies",
                "tvDramas" => "TvDramas",
                "talkShowsTvComedies" => "TalkShowsTvComedies",
                "thrillers" => "Thrillers",
                _ => null
            };

            if (genreProperty == null)
                return BadRequest("Invalid genre key");

            var movies = await _context.MoviesTitles
                .Where(m => EF.Property<int?>(m, genreProperty) == 1)
                .AsNoTracking()
                .ToListAsync();

            return Ok(movies);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Failed to fetch genre: {genreKey}");
            return StatusCode(500, "Internal server error while fetching genre");
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
