using System;
using System.Collections.Generic;

namespace INTEX.API.Models;

public partial class MoviesRating
{
    public string? UserId { get; set; }

    public string? ShowId { get; set; }

    public int? Rating { get; set; }
}
