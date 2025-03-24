using PC_Build_DAL;
using PC_Build_DAL.Interface;
using PC_Build_DatabaseFactory;
using PC_Build_Service;
using PC_Build_Service.Interface;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSingleton<IAdminService, AdminService>();
builder.Services.AddSingleton<IAdminDAL, AdminDAL>();
builder.Services.AddSingleton<IComponentTypeService, ComponentTypeService>();
builder.Services.AddSingleton<IComponentTypeDAL, ComponentTypeDAL>();
builder.Services.AddSingleton<IComponentService, ComponentService>();
builder.Services.AddSingleton<IComponentDAL, ComponentDAL>();
builder.Services.AddSingleton<IPreBuildService, PreBuildService>();
builder.Services.AddSingleton<IPreBuildDAL, PreBuildDAL>();
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