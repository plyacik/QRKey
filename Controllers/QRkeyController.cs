using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRKey.Models;

namespace QRKey.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QRkeyController : ControllerBase
    {
        [HttpGet]
        //GET : /api/QRKey
        public ActionResult Get()
        {
            OutQR code = new OutQR { Code = "HelloWorld2" };
            return Ok(code);
        }
    }
}