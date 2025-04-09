using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
namespace INTEX.API.Models;

public partial class MoviesUser
{
    [Column("user_id")]
    public string? UserId { get; set; }
    [Column("name")]
    public string? Name { get; set; }
    [Column("phone")]
    public string? Phone { get; set; }
    [Column("email")]
    public string? Email { get; set; }
    [Column("age")]
    public int? Age { get; set; }
    [Column("gender")]
    public string? Gender { get; set; }
    [Column("netflix")]
    public int? Netflix { get; set; }
    [Column("Amazon Prime")]
    public int? AmazonPrime { get; set; }
    [Column("Disney+")]
    public int? Disney { get; set; }
    [Column("Paramount+")]
    public int? Paramount { get; set; }
    [Column("max")]
    public int? Max { get; set; }
    [Column("hulu")]
    public int? Hulu { get; set; }
    [Column("Apple TV+")]
    public int? AppleTv { get; set; }
    [Column("peacock")]
    public int? Peacock { get; set; }
    [Column("city")]
    public string? City { get; set; }
    [Column("state")]
    public string? State { get; set; }
    [Column("zip")]
    public int? Zip { get; set; }
}
