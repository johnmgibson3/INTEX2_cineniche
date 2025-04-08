using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX.API.Models;

public partial class MoviesTitle
{
    public string? ShowId { get; set; }

    public string? Type { get; set; }

    public string? Title { get; set; }

    public string? Director { get; set; }

    public string? Cast { get; set; }

    public string? Country { get; set; }

    public int? ReleaseYear { get; set; }

    public string? Rating { get; set; }

    public string? Duration { get; set; }

    public string? Description { get; set; }
    
    [Column("action")]
    public int? Action { get; set; }
    
    [Column("adventure")]
    public int? Adventure { get; set; }

    public int? AnimeSeriesInternationalTvShows { get; set; }

    public int? BritishTvShowsDocuseriesInternationalTvShows { get; set; }

    [Column("children")]
    public int? Children { get; set; }
    [Column("comedies")]
    public int? Comedies { get; set; }

    public int? ComediesDramasInternationalMovies { get; set; }

    public int? ComediesInternationalMovies { get; set; }

    public int? ComediesRomanticMovies { get; set; }

    public int? CrimeTvShowsDocuseries { get; set; }
    [Column("documentaries")]
    public int? Documentaries { get; set; }

    public int? DocumentariesInternationalMovies { get; set; }
    [Column("docuseries")]
    public int? Docuseries { get; set; }
    [Column("dramas")]
    public int? Dramas { get; set; }

    public int? DramasInternationalMovies { get; set; }

    public int? DramasRomanticMovies { get; set; }

    public int? FamilyMovies { get; set; }
    [Column("fantasy")]
    public int? Fantasy { get; set; }

    public int? HorrorMovies { get; set; }

    public int? InternationalMoviesThrillers { get; set; }

    public int? InternationalTvShowsRomanticTvShowsTvDramas { get; set; }

    public int? KidsTv { get; set; }

    public int? LanguageTvShows { get; set; }
    [Column("musicals")]
    public int? Musicals { get; set; }

    public int? NatureTv { get; set; }

    public int? RealityTv { get; set; }
    [Column("spirituality")]
    public int? Spirituality { get; set; }

    public int? TvAction { get; set; }

    public int? TvComedies { get; set; }

    public int? TvDramas { get; set; }

    public int? TalkShowsTvComedies { get; set; }
    [Column("thrillers")]
    public int? Thrillers { get; set; }
}
