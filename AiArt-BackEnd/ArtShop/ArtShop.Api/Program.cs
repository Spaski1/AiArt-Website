using ArtShop.DataAcces;
using ArtShop.Services.Interfaces;
using ArtShop.Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using AspNetCoreRateLimit;
using ArtShop.Services.ExceptionMiddlewere;

var builder = WebApplication.CreateBuilder(args);

// Configure Database Context (with pooling)
builder.Services.AddDbContextPool<ArtShopDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ArtShopDbContext"));
});

// Configure CORS with relaxed headers & methods
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()  // Allow any header for flexibility
              .AllowAnyMethod(); // Allow any method
    });
});

// Register HTTP Client
builder.Services.AddHttpClient();

// Register Controllers and API Documentation
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Configure Swagger for API Documentation with JWT Authentication
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "AiArt", Version = "v1" });

    var securityScheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Scheme = "bearer",
        Name = "Authorization",
        Description = "JWT Authorization header using the Bearer scheme",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http
    };

    c.AddSecurityDefinition("Bearer", securityScheme);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Register Custom Services (Scoped for per-request lifetime)
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IArtImageService, ArtImageService>();
builder.Services.AddScoped<ICartService, CartService>();

// Add User Secrets
builder.Configuration.AddUserSecrets<Program>();

// JWT Authentication Configuration
var jwtSettings = builder.Configuration.GetSection("JwtSettings");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = !builder.Environment.IsDevelopment(); // HTTPS enforced in production
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = bool.Parse(jwtSettings["ValidateIssuer"]),
            ValidateAudience = bool.Parse(jwtSettings["ValidateAudience"]),
            ValidateLifetime = bool.Parse(jwtSettings["ValidateLifetime"]),
            ValidateIssuerSigningKey = bool.Parse(jwtSettings["ValidateIssuerSigningKey"]),
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings["SecretKey"]))
        };
    });

// Add Health Checks for monitoring
builder.Services.AddHealthChecks().AddDbContextCheck<ArtShopDbContext>();

// Configure Rate Limiting using `InMemoryRateLimiting`
builder.Services.AddMemoryCache(); // Required for in-memory rate limiting
builder.Services.AddInMemoryRateLimiting();
builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
builder.Services.Configure<ClientRateLimitOptions>(builder.Configuration.GetSection("ClientRateLimiting"));
builder.Services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
builder.Services.AddSingleton<IClientPolicyStore, MemoryCacheClientPolicyStore>();
builder.Services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
builder.Services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

// Build Application
var app = builder.Build();

// Global Exception Handling Middleware
app.UseMiddleware<GlobalExceptionHandlerMiddleware>();

// Configure Middleware Order
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // For serving static files

app.UseCors("AllowAngularApp");

app.UseIpRateLimiting(); // Apply rate limiting

app.UseAuthentication();
app.UseAuthorization();

app.MapHealthChecks("/health"); // Health checks endpoint
app.MapControllers();

app.Run();
