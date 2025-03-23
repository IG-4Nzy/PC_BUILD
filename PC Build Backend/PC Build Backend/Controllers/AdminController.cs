using Microsoft.AspNetCore.Mvc;
using PC_Build_Models;
using PC_Build_Service;

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
			return adminService.Login(loginData) ? Ok() : Unauthorized();
		}

		[HttpPost]
		[Route("AddComponentType")]
		public IActionResult AddComponentType(string typeName)
		{
			Return response = adminService.AddComponentType(typeName);
			return response == Return.OK ? Ok()
				: response == Return.DUPLICATE ? Conflict()
				: response == Return.NOT_ADDED ? NotFound()
				: StatusCode(StatusCodes.Status500InternalServerError);
		}

		[HttpPost]
		[Route("AddComponent")]
		public IActionResult AddComponent(PcComponet pcComponet)
		{
			Return response = adminService.AddComponent(pcComponet);
			return response == Return.OK ? Ok()
				: response == Return.DUPLICATE ? Conflict()
				: response == Return.NOT_ADDED ? NotFound()
				: StatusCode(StatusCodes.Status500InternalServerError);
		}
	}
}