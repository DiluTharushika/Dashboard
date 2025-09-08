using NipponPaint.Api.Models;

namespace NipponPaint.Api.Services
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
