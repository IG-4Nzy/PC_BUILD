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
			return Ok(Json(componentService.AddComponent(pcComponent)));
		}

		[HttpGet]
		[Route("GetAllComponentsInType")]
		public IActionResult GetAllComponentsInType(string typeId)
		{
			return Ok(componentService.GetAllComponentsInType(typeId));
		}

		[HttpPost]
		[Route("EditComponent")]
		public IActionResult EditComponent(PcComponent pcComponent)
		{
			return Ok(Json(componentService.EditComponent(pcComponent)));
		}

		[HttpDelete]
		[Route("DeleteComponent")]
		public IActionResult DeleteComponent(string id)
		{
			return Ok(Json(componentService.DeleteComponent(id)));
		}
	}
}