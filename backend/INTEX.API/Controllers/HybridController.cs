using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using INTEX.API.Models;

namespace INTEX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HybridController : ControllerBase
    {
        private readonly HybridContext _context;

        public HybridController(HybridContext context)
        {
            _context = context;
        }

        // GET: api/Hybrid
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HybridRecommender>>> GetHybridMovieRecommendations()
        {
            return await _context.HybridMovieRecommendations.ToListAsync();
        }

        // GET: api/Hybrid/s123
        [HttpGet("{originalMovieId}")]
        public async Task<ActionResult<HybridRecommender>> GetHybridMovieRecommendation(string originalMovieId)
        {
            var recommendation = await _context.HybridMovieRecommendations
                .FirstOrDefaultAsync(r => r.OriginalMovieId == originalMovieId);

            if (recommendation == null)
            {
                return NotFound();
            }

            return recommendation;
        }

        // GET: api/Hybrid/search?title=Movie Title
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<HybridRecommender>>> SearchRecommendationsByTitle(
            [FromQuery] string title)
        {
            if (string.IsNullOrWhiteSpace(title))
            {
                return BadRequest("Title search cannot be empty");
            }

            var recommendations = await _context.HybridMovieRecommendations
                .Where(r => r.OriginalMovieTitle.ToLower().Contains(title.ToLower()))
                .ToListAsync();

            if (!recommendations.Any())
            {
                return NotFound($"No recommendations found for title containing: {title}");
            }

            return recommendations;
        }

        // GET: api/Hybrid/top5
        [HttpGet("top5")]
        public async Task<ActionResult<IEnumerable<HybridRecommender>>> GetTop5Recommendations()
        {
            return await _context.HybridMovieRecommendations
                .OrderByDescending(r => r.Rec1Score)
                .Take(5)
                .ToListAsync();
        }

        // Custom method to get recommendations with high scores
        // GET: api/Hybrid/high-quality
        [HttpGet("high-quality")]
        public async Task<ActionResult<IEnumerable<HybridRecommender>>> GetHighQualityRecommendations(
            [FromQuery] double minScore = 0.7)
        {
            var highQualityRecommendations = await _context.HybridMovieRecommendations
                .Where(r => r.Rec1Score >= minScore)
                .ToListAsync();

            if (!highQualityRecommendations.Any())
            {
                return NotFound($"No recommendations found with score above {minScore}");
            }

            return highQualityRecommendations;
        }
        [HttpGet("ping-db")]
        public IActionResult PingDb()
        {
            var conn = _context.Database.GetDbConnection();
            return Ok(new {
                conn.Database,
                conn.DataSource,
                conn.ConnectionString
            });
        }

    }
}