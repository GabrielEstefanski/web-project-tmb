using Polly;
using System.Net.Http;
using ApiTmb.Data;
using ApiTmb.Data.Repositories;
using ApiTmb.Hubs;
using ApiTmb.Services;
using Microsoft.EntityFrameworkCore;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

var configuration = new ConfigurationBuilder()
    .AddEnvironmentVariables()
    .Build();

builder.Configuration["AzureServiceBus:ConnectionString"] = Environment.GetEnvironmentVariable("AZURE_SERVICE_BUS");
builder.Configuration["AzureServiceBus:QueueName"] = Environment.GetEnvironmentVariable("AZURE_SERVICE_QUEUE");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("http://localhost:5000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DbConnection"),
        npgsqlOptions => npgsqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(10),
            errorCodesToAdd: null
        )
    ));


builder.Services.AddSingleton<IHostedService, OrderProcessingWorker>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddSingleton<IServiceBusService, ServiceBusService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var app = builder.Build();

await RetryDatabaseConnectionAsync(app);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapHub<NotificationHub>("/notifications"); 

app.Run();

async Task RetryDatabaseConnectionAsync(WebApplication app)
{
    var maxRetries = 10;
    var retryDelay = TimeSpan.FromSeconds(5);
    var policy = Policy.Handle<NpgsqlException>()
                       .WaitAndRetryAsync(maxRetries, _ => retryDelay);

    await policy.ExecuteAsync(async () =>
    {
        using (var scope = app.Services.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            await dbContext.Database.OpenConnectionAsync();
        }
    });
}