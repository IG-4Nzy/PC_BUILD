using PC_Build_DAL;
using PC_Build_DatabaseFactory;
using PC_Build_Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<IAdminDAL, AdminDAL>();
builder.Services.AddSingleton<IAdminService, AdminService>();
builder.Services.AddSingleton<IDatabaseFactory, MySqlDatabaseFactory>();

var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("*"));

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();