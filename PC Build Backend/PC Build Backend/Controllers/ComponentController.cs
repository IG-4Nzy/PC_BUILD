using Microsoft.AspNetCore.Mvc;
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
		public IActionResult AddComponent(PcComponent pcComponent)
		{
			Return response = componentService.AddComponent(pcComponent);
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
			List<PcComponent>? pcComponents = componentService.GetAllPcComponents();
			return null != componentService ? Ok(pcComponents) : StatusCode(StatusCodes.Status500InternalServerError);
		}

		[HttpPost]
		[Route("EditComponent")]
		public IActionResult EditComponent(PcComponent pcComponent)
		{
			Return response = componentService.EditComponent(pcComponent);
			return response == Return.OK ? Ok()
				: response == Return.DUPLICATE ? Conflict()
				: response == Return.DB_NOT_UPDATED ? NotFound()
				: response == Return.BAD_REQUEST ? BadRequest()
				: StatusCode(StatusCodes.Status500InternalServerError);
		}

		[HttpDelete]
		[Route("DeleteComponent")]
		public IActionResult DeleteComponent(string id)
		{
			Return response = componentService.DeleteComponent(id);
			return response == Return.OK ? Ok()
				: response == Return.DB_NOT_UPDATED ? NotFound()
				: StatusCode(StatusCodes.Status500InternalServerError);
		}
	}
}