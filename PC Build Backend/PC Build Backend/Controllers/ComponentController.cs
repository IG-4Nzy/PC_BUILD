using Microsoft.AspNetCore.Mvc;
using PC_Build_Models;
using PC_Build_Service;

namespace PC_Build_Backend.Controllers
{
	[ApiController]
	[Route("Component")]
	public class ComponentController(IComponentService componentService) : Controller
	{
		private readonly IComponentService componentService = componentService;

		[HttpPost]
		[Route("AddComponentType")]
		public IActionResult AddComponentType(string typeName)
		{
			Return response = componentService.AddComponentType(typeName);
			return response == Return.OK ? Ok()
				: response == Return.DUPLICATE ? Conflict()
				: response == Return.NOT_ADDED ? NotFound()
				: StatusCode(StatusCodes.Status500InternalServerError);
		}

		[HttpPost]
		[Route("AddComponent")]
		public IActionResult AddComponent(PcComponet pcComponet)
		{
			Return response = componentService.AddComponent(pcComponet);
			return response == Return.OK ? Ok()
				: response == Return.DUPLICATE ? Conflict()
				: response == Return.NOT_ADDED ? NotFound()
				: StatusCode(StatusCodes.Status500InternalServerError);
		}
	}
}