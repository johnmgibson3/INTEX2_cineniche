using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace INTEX.API.Models
{
    [Table("hybrid_movie_recommendations")]
    public class HybridRecommender
    {
        [Key] // Add Key attribute to specify primary key
        [Column("original_movie_id")] // Explicitly map column names
        public string OriginalMovieId { get; set; }

        [Column("original_movie_title")]
        public string OriginalMovieTitle { get; set; }

        [Column("rec1_id")]
        public string Rec1Id { get; set; }

        [Column("rec1_title")]
        public string Rec1Title { get; set; }

        [Column("rec1_score")]
        public double Rec1Score { get; set; }

        [Column("rec2_id")]
        public string Rec2Id { get; set; }

        [Column("rec2_title")]
        public string Rec2Title { get; set; }

        [Column("rec2_score")]
        public double Rec2Score { get; set; }

        [Column("rec3_id")]
        public string Rec3Id { get; set; }

        [Column("rec3_title")]
        public string Rec3Title { get; set; }

        [Column("rec3_score")]
        public double Rec3Score { get; set; }

        [Column("rec4_id")]
        public string Rec4Id { get; set; }

        [Column("rec4_title")]
        public string Rec4Title { get; set; }

        [Column("rec4_score")]
        public double Rec4Score { get; set; }

        [Column("rec5_id")]
        public string Rec5Id { get; set; }

        [Column("rec5_title")]
        public string Rec5Title { get; set; }

        [Column("rec5_score")]
        public double Rec5Score { get; set; }
    }
}