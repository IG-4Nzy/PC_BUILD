using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PC_Build_Service;

namespace PC_Build_Backend.Controllers
{
    [ApiController]
    [Route("Admin")]
    public class AdminController(IAdminService adminService) : Controller
    {
        private readonly IAdminService adminService = adminService;

        [HttpGet]
        [Route("Login")]
        public IActionResult Login()
        {
            return Ok("Hello");
        }
    }
}