using System.ComponentModel.DataAnnotations;

namespace NipponPaint.Api.Dtos
{
    public class RegisterDto
    {
        [Required] public string Username { get; set; } = null!;
        [Required, EmailAddress] public string Email { get; set; } = null!;
        [Required] public string Phone { get; set; } = null!;
        [Required, MinLength(6)] public string Password { get; set; } = null!;
    }
}
