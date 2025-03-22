using PC_Build_DAL;
using PC_Build_DatabaseFactory;
using PC_Build_Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<IAdminService, AdminService>();
builder.Services.AddSingleton<IAdminDAL, AdminDAL>();
builder.Services.AddSingleton<IDatabaseFactory, MySqlDatabaseFactory>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.WithOrigins("http://localhost:8080")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
});

var app = builder.Build();

app.UseCors("AllowAll");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();