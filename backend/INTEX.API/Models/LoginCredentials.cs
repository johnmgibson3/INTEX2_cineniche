using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace INTEX.API.Models
{
    public class LoginCredentials
    {
        [Key]
        [Required]
        public int UserId { get; set; }
        [Required]
        public string username { get; set; }
        public bool? email_confirmed { get; set; }
        [Required]
        public string password_hash { get; set; }
        public string? security_stamp { get; set; }
        public string? concurrency_stamp { get; set; }
        public bool? phone_confirmed { get; set; }
        public bool? two_factor_enabled { get; set; }
        public bool? lockout_end { get; set; }
        public bool? lockout_enabled { get; set; }
        [Required]
        public int access_failed_count { get; set; }
        [Required]
        public bool admin_status { get; set; }

    }

}
