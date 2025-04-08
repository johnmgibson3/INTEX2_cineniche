using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using INTEX.API.Models; // Add this to import your LoginCredentials class

namespace INTEX.API.Services;

public class CustomUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<LoginCredentials>
{
    public CustomUserClaimsPrincipalFactory(
        UserManager<LoginCredentials> userManager,
        IOptions<IdentityOptions> optionsAccessor)
        : base(userManager, optionsAccessor) { }

    protected override async Task<ClaimsIdentity> GenerateClaimsAsync(LoginCredentials user)
    {
        var identity = await base.GenerateClaimsAsync(user);
        identity.AddClaim(new Claim(ClaimTypes.Email, user.Email ?? "")); // Ensure email claim is always present
        return identity;
    }
}