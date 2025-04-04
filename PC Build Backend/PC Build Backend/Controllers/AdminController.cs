using Microsoft.AspNetCore.Mvc;
using PC_Build_Models;
using PC_Build_Service.Interface;

namespace PC_Build_Backend.Controllers
{
	[ApiController]
	[Route("Admin")]
	public class AdminController(IAdminService adminService) : Controller
	{
		private readonly IAdminService adminService = adminService;

		[HttpPost]
		[Route("Login")]
		public IActionResult Login(LoginData loginData)
		{
			return Ok(Json(adminService.Login(loginData)));
		}
	}
}