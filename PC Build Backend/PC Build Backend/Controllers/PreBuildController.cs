using Microsoft.AspNetCore.Mvc;
using PC_Build_Models;
using PC_Build_Service.Interface;

namespace PC_Build_Backend.Controllers
{
	[ApiController]
	[Route("PreBuild")]
	public class PreBuildController(IPreBuildService preBuildService) : Controller
	{
		private readonly IPreBuildService preBuildService = preBuildService;

		[HttpPost]
		[Route("AddPreBuild")]
		public IActionResult AddPreBuild(PreBuild preBuild)
		{
			return Ok(Json(preBuildService.AddPreBuild(preBuild)));
		}

		[HttpPost]
		[Route("GetPreBuilds")]
		public IActionResult GetPreBuild(string purpose)
		{
			return Ok(Json(preBuildService.GetPreBuild(purpose)));
		}

		[HttpDelete]
		[Route("DeletePreBuild")]
		public IActionResult DeletePreBuild(string preBuildId)
		{
			return Ok(Json(preBuildService.DeletePreBuild(preBuildId)));
		}
	}
}