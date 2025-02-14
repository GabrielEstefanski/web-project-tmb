using ApiTmb.Data;
using ApiTmb.Data.Repositories;
using ApiTmb.Hubs;
using ApiTmb.Services;
using Microsoft.EntityFrameworkCore;

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
    options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnection")));

builder.Services.AddSingleton<IHostedService, OrderProcessingWorker>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddSingleton<IServiceBusService, ServiceBusService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapHub<NotificationHub>("/notifications"); 

app.Run();
