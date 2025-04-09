using System.ComponentModel.DataAnnotations;

namespace INTEX.API.Models.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long.")]
        public string Password { get; set; }
    }

    public class LoginDto
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}