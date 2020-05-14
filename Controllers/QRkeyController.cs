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
        private UserManager<ApplicationUser> _userManager;
        public QRkeyController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            db = context;
            _userManager = userManager;
        }
        [HttpGet]
        //GET : /api/QRKey
        public async Task<IActionResult> Get()
        {
            ClaimsPrincipal currentUser = this.User;
            var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            ApplicationUser user = await _userManager.FindByIdAsync(currentUserID);
            DateTime now = DateTime.Now;
            long now_timestamp = new DateTimeOffset(now).ToUnixTimeSeconds();
            QRCode qr_in_db = db.QRCodes.FirstOrDefault(p => p.User.Id == currentUserID && p.Validity >= now_timestamp);
            QRView code = new QRView();
            if (qr_in_db == null)
            {
                QRCode newQr = new QRCode
                {
                    Code = RandomString(16),
                    Created = now_timestamp,
                    Validity = new DateTimeOffset(now.AddDays(14)).ToUnixTimeSeconds(),
                    User = user
                };
                db.QRCodes.Add(newQr);
                db.SaveChanges();
                code.Code = newQr.Code;
                code.Validity = newQr.Validity;
                code.Created = newQr.Created;
            }
            else
            {
                code.Code = qr_in_db.Code;
                code.Validity = qr_in_db.Validity;
                code.Created = qr_in_db.Created;
            }

            return Ok(code);
        }

        [HttpPost]
        //POST : /api/QRKey
        public async Task<IActionResult> Post()
        {
            ClaimsPrincipal currentUser = this.User;
            var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            ApplicationUser user = await _userManager.FindByIdAsync(currentUserID);
            DateTime now = DateTime.Now;
            long now_timestamp = new DateTimeOffset(now).ToUnixTimeSeconds();
            IQueryable<QRCode> qrs_in_db = db.QRCodes.Where(p => p.User.Id == currentUserID && p.Validity >= now_timestamp);
            foreach (QRCode one_qr_in_db in qrs_in_db)
            {
                one_qr_in_db.Validity = now_timestamp - 1;
            }
            db.SaveChanges();
            QRView code = new QRView();
            QRCode newQr = new QRCode
            {
                Code = RandomString(16),
                Created = now_timestamp,
                Validity = new DateTimeOffset(now.AddDays(14)).ToUnixTimeSeconds(),
                User = user
            };
            db.QRCodes.Add(newQr);
            db.SaveChanges();
            code.Code = newQr.Code;
            code.Validity = newQr.Validity;
            code.Created = newQr.Created;

            return Ok(code);
        }

        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}