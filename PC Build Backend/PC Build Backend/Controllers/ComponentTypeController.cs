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
			Return response = componentTypeService.AddComponentType(pcComponentType);
			return response == Return.OK ? Ok()
				: response == Return.DUPLICATE ? Conflict()
				: response == Return.DB_NOT_UPDATED ? NotFound()
				: response == Return.BAD_REQUEST ? BadRequest()
				: StatusCode(StatusCodes.Status500InternalServerError);
		}

		[HttpGet]
		[Route("GetAllComponentTypes")]
		public IActionResult GetAllComponentTypes()
		{
			List<PcComponentType>? pcComponentTypes = componentTypeService.GetAllComponentTypes();
			return pcComponentTypes != null ? Ok(pcComponentTypes)
				: StatusCode(StatusCodes.Status500InternalServerError);
		}

		[HttpPost]
		[Route("EditComponentType")]
		public IActionResult EditComponentType(PcComponentType pcComponentType)
		{
			Return response = componentTypeService.EditComponentType(pcComponentType);
			return response == Return.OK ? Ok()
				: response == Return.DUPLICATE ? Conflict()
				: response == Return.DB_NOT_UPDATED ? NotFound()
				: response == Return.BAD_REQUEST ? BadRequest()
				: StatusCode(StatusCodes.Status500InternalServerError);
		}

		[HttpDelete]
		[Route("DeleteComponentType")]
		public IActionResult DeleteComponentType(string id)
		{
			Return response = componentTypeService.DeleteComponentType(id);
			return response == Return.OK ? Ok()
				: response == Return.DB_NOT_UPDATED ? NotFound()
				: StatusCode(StatusCodes.Status500InternalServerError);
		}
	}
}