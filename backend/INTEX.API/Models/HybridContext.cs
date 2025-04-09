using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace INTEX.API.Models;

public partial class HybridContext : DbContext
{
    public HybridContext()
    {
    }

    public HybridContext(DbContextOptions<HybridContext> options)
        : base(options)
    {
    }

    public virtual DbSet<HybridRecommender> HybridMovieRecommendations { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<HybridRecommender>(entity =>
        {
            entity.HasKey(e => e.OriginalMovieId);

            entity.ToTable("hybrid_movie_recommendations");

            entity.Property(e => e.OriginalMovieId).HasColumnName("original_movie_id");
            entity.Property(e => e.OriginalMovieTitle).HasColumnName("original_movie_title");

            entity.Property(e => e.Rec1Id).HasColumnName("rec1_id");
            entity.Property(e => e.Rec1Title).HasColumnName("rec1_title");
            entity.Property(e => e.Rec1Score).HasColumnName("rec1_score");

            entity.Property(e => e.Rec2Id).HasColumnName("rec2_id");
            entity.Property(e => e.Rec2Title).HasColumnName("rec2_title");
            entity.Property(e => e.Rec2Score).HasColumnName("rec2_score");

            entity.Property(e => e.Rec3Id).HasColumnName("rec3_id");
            entity.Property(e => e.Rec3Title).HasColumnName("rec3_title");
            entity.Property(e => e.Rec3Score).HasColumnName("rec3_score");

            entity.Property(e => e.Rec4Id).HasColumnName("rec4_id");
            entity.Property(e => e.Rec4Title).HasColumnName("rec4_title");
            entity.Property(e => e.Rec4Score).HasColumnName("rec4_score");

            entity.Property(e => e.Rec5Id).HasColumnName("rec5_id");
            entity.Property(e => e.Rec5Title).HasColumnName("rec5_title");
            entity.Property(e => e.Rec5Score).HasColumnName("rec5_score");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
