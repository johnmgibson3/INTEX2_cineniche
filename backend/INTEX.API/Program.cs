using System.Security.Claims;
using INTEX.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using INTEX.API.Services;
using INTEX.API.Models;
using INTEX.API.Data;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

//IS THIS HURTING OUR SECURITY?
builder.Services.AddHttpClient();


builder.Services.AddDbContext<MoviesContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection")));

builder.Services.AddDbContext<HybridContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("HybridConnection")));

//builder.Services.AddDbContext<MoviesContext>(options =>
//    options.UseSqlite(builder.Configuration.GetConnectionString("MovieConnection")));



builder.Services.AddAuthorization();

builder.Services.AddIdentity<LoginCredentials, IdentityRole>() //THIS WAS ADDED FOR THE RBAC STUFF 
    .AddEntityFrameworkStores<MoviesContext>()
    .AddDefaultTokenProviders();

//builder.Services.AddIdentityApiEndpoints<IdentityUser>()

//    .AddEntityFrameworkStores<MoviesContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email; // Ensure email is stored in claims

    // Enhanced password settings
    options.Password.RequireDigit = true;               // Require at least one digit
    options.Password.RequireLowercase = true;           // Require at least one lowercase character
    options.Password.RequireUppercase = true;           // Require at least one uppercase character
    options.Password.RequireNonAlphanumeric = true;     // Require at least one special character
    options.Password.RequiredLength = 14;               // Minimum length
    options.Password.RequiredUniqueChars = 6;           // Require at least 6 unique characters
});

//builder.Services.AddScoped<IUserClaimsPrincipalFactory<LoginCredentials>, CustomUserClaimsPrincipalFactory>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None; //change after adding https for production
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    // options.Cookie.Domain = "intex-backend7-c2cghsf3cbddhdfm.centralus-01.azurewebsites.net"; 
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("https://gentle-bush-08eaa6310.6.azurestaticapps.net", "https://www.cineniche.net", "https://cineniche.net") // Replace with your frontend URL
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials(); // Required to allow cookies
        });
});

builder.Services.AddSingleton<IEmailSender<LoginCredentials>, NoOpEmailSender<LoginCredentials>>();

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }


app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.Use(async (context, next) =>
{
    await next();
    context.Response.Headers["Access-Control-Allow-Credentials"] = "true";
});
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.MapIdentityApi<LoginCredentials>();
// app.MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<LoginCredentials> signInManager) =>
{
    await signInManager.SignOutAsync();
    // Ensure authentication cookie is removed
        context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Domain = "intex-backend7-c2cghsf3cbddhdfm.centralus-01.azurewebsites.net",
            Path = "/"
        });
    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();
app.MapGet("/api/Hybrid/debug", () => "Hybrid controller test response.");

app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }
    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com"; // Ensure it's never null
    return Results.Json(new { email = email }); // Return as JSON
}).RequireAuthorization();

app.Run();
