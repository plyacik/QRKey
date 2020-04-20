using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace QRKey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QRkeyController : ControllerBase
    {
        [HttpGet]
        [Route("GetQrkey")]
        //GET : /api/QRKey/GetQrkey
        public string GetQrkey()
        {
            string code = "HelloWorld";
            return code;
        }
    }
}