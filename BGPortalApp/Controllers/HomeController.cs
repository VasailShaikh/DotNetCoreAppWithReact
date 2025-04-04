using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using BGPortalApp.Models;
using BGPortalApp.BGDAL;
using BGPortalApp.BGBLL;
using static Azure.Core.HttpHeader;


namespace BGPortalApp.Controllers;

public class HomeController : Controller
{
    private readonly IConfiguration configuration;
    private readonly ILogger<HomeController> logger;
    private string PsNo = "800000050";
    string role = "BG PROCESSOR";
    BGCommon BGDetaislBL;
    public HomeController(IConfiguration _configuration, ILogger<HomeController> _logger)
    {
        configuration = _configuration;
        logger = _logger;
        BGDetaislBL = new BGCommon(configuration, logger);
    }

    public IActionResult Index()
    {
        try
        {
            var ListStatusCount = BGDetaislBL.GetBGDashboardCount(PsNo);
            return View(ListStatusCount);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    public JsonResult BGList( int pageIndex, int pageSize, string filterText, int statusID, bool myPending, string sortBy)
    {
        try
        {
            var BGrequestList = BGDetaislBL.BGRequestList(role,PsNo,pageIndex,pageSize,filterText,statusID,myPending,sortBy);
            if (BGrequestList != null)
            {
                return Json(new { Success = true, bGList = BGrequestList, totalrow = BGrequestList.Count });
            }
            return Json(new { Success = false});
        }
        catch (Exception ex)
        {
            throw ex;
        }

    }
    public IActionResult Privacy()
    {
        return View();
    }

    public ActionResult BGRequests(string param = "")
    {
        TempData["Dashborad"] = "BGRequests";
        if (!string.IsNullOrWhiteSpace(param))
        {
            ViewBag.ddlstatus = BGPortalApp.Models.Common.Decrypt(param);
        }
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
