using Microsoft.AspNetCore.Mvc;
using PC_Build_DAL;
using PC_Build_Models;
using PC_Build_Service.Interface;

namespace PC_Build_Backend.Controllers
{
	[ApiController]
	[Route("Component")]
	public class ComponentController(IComponentService componentService) : Controller
	{
		private readonly IComponentService componentService = componentService;

		[HttpPost]
		[Route("AddComponent")]
		public IActionResult AddComponent(PcComponet pcComponet)
		{
			Return response = componentService.AddComponent(pcComponet);
			return response == Return.OK ? Ok()
				: response == Return.DUPLICATE ? Conflict()
				: response == Return.DB_NOT_UPDATED ? NotFound()
				: response == Return.BAD_REQUEST ? BadRequest()
				: StatusCode(StatusCodes.Status500InternalServerError);
		}

		[HttpGet]
		[Route("GetAllComponents")]
		public IActionResult GetAllPcComponents()
		{
			List<PcComponet>? pcComponets = componentService.GetAllPcComponents();
			return null != componentService ? Ok(pcComponets) : StatusCode(StatusCodes.Status500InternalServerError);
		}
	}
}