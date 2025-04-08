using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace INTEX.API.Models
{
    public class LoginCredentials : IdentityUser
    {
        // We need to override the Id property from IdentityUser
        // but map it to your user_id column
        [Column("user_id")]
        public override string Id { get => base.Id; set => base.Id = value; }

        [Column("username")]
        public override string? UserName { get => base.UserName; set => base.UserName = value; }

        [Column("email_confirmed")]
        public override bool EmailConfirmed { get => base.EmailConfirmed; set => base.EmailConfirmed = value; }

        [Column("password_hash")]
        public override string? PasswordHash { get => base.PasswordHash; set => base.PasswordHash = value; }

        [Column("security_stamp")]
        public override string? SecurityStamp { get => base.SecurityStamp; set => base.SecurityStamp = value; }

        [Column("concurrency_stamp")]
        public override string? ConcurrencyStamp { get => base.ConcurrencyStamp; set => base.ConcurrencyStamp = value; }

        [Column("phone_confirmed")]
        public override bool PhoneNumberConfirmed { get => base.PhoneNumberConfirmed; set => base.PhoneNumberConfirmed = value; }

        [Column("two_factor_enabled")]
        public override bool TwoFactorEnabled { get => base.TwoFactorEnabled; set => base.TwoFactorEnabled = value; }

        // SQLite doesn't have a DateTimeOffset type, so we might need special handling
        [NotMapped]
        public override DateTimeOffset? LockoutEnd { get => base.LockoutEnd; set => base.LockoutEnd = value; }

        [Column("lockout_end")]
        public bool? LockoutEndBool { get; set; }

        [Column("lockout_enabled")]
        public override bool LockoutEnabled { get => base.LockoutEnabled; set => base.LockoutEnabled = value; }

        [Column("access_failed_count")]
        public override int AccessFailedCount { get => base.AccessFailedCount; set => base.AccessFailedCount = value; }

        [Column("admin_status")]
        public bool AdminStatus { get; set; }
    }
}