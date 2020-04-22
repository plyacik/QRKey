using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QRKey.Data;
using QRKey.Models;

namespace QRKey.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class QRkeyController : ControllerBase
    {
        private ApplicationDbContext db;
        public QRkeyController(ApplicationDbContext context)
        {
            db = context;
        }
        [HttpGet]
        //GET : /api/QRKey
        public IActionResult Get()
        {
            ClaimsPrincipal currentUser = this.User;
            var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            QRCode qrdb = db.QRCodes.FirstOrDefault(p => p.User.Id == currentUserID);
            QRView code = new QRView();
            if (qrdb == null)
            {
                code.Code = "123";
            } else
            {
                code.Code = qrdb.Code;
            }
            
            return Ok(code);
        }
    }
}