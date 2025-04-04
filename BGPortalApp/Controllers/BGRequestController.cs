using Microsoft.AspNetCore.Mvc;

namespace BGPortalApp.Controllers
{
    public class BGRequestController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult VendorCreate()
        {
            return View();
        }

        public IActionResult BuyerCreate()
        {
            return View();
        }

        public IActionResult ProcessorCreate()
        {
            return View();
        }
    }
}
