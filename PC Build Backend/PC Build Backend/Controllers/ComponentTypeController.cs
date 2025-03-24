using Microsoft.AspNetCore.Mvc;
using PC_Build_Models;
using PC_Build_Service.Interface;

namespace PC_Build_Backend.Controllers
{
	[ApiController]
	[Route("ComponentType")]
	public class ComponentTypeController(IComponentTypeService componentTypeService) : Controller
	{
		private readonly IComponentTypeService componentTypeService = componentTypeService;

		[HttpPost]
		[Route("AddComponentType")]
		public IActionResult AddComponentType(PcComponentType pcComponentType)
		{
			return Ok(Json(componentTypeService.AddComponentType(pcComponentType)));
		}

		[HttpGet]
		[Route("GetAllComponentTypes")]
		public IActionResult GetAllComponentTypes()
		{
			return Ok(componentTypeService.GetAllComponentTypes());
		}

		[HttpPost]
		[Route("EditComponentType")]
		public IActionResult EditComponentType(PcComponentType pcComponentType)
		{
			return Ok(Json(componentTypeService.EditComponentType(pcComponentType)));
		}

		[HttpDelete]
		[Route("DeleteComponentType")]
		public IActionResult DeleteComponentType(string id)
		{
			return Ok(Json(componentTypeService.DeleteComponentType(id)));
		}
	}
}