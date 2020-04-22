using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        private _userManager = 
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
            ApplicationUser user = UserManager.;
            QRCode qr_in_db = db.QRCodes.FirstOrDefault(p => p.User.Id == currentUserID);
            QRView code = new QRView();
            if (qr_in_db == null)
            {
                QRCode newQr = new QRCode { 
                    Code = "123",
                    Created = DateTime.Now.Ticks,
                    Validity = DateTime.Now.Ticks + 1000,
                    User = db.Users.currentUserID
                }
                code.Code = "123";
            } else {
                code.Code = qr_in_db.Code;
            }
            
            return Ok(code);
        }
    }
}