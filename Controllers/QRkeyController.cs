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
                    StartValidity = now_timestamp,
                    IsGuest = false,
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
            IQueryable<QRCode> qrs_in_db = db.QRCodes.Where(p => p.User.Id == currentUserID && p.Validity >= now_timestamp && p.IsGuest == false);
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
                StartValidity = now_timestamp,
                IsGuest = false,
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

        [HttpGet]
        [Route("GetQrList")]
        //GET : /api/QRKey/GetQrList
        public async Task<IActionResult> GetQrList()
        {
            ClaimsPrincipal currentUser = this.User;
            var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            ApplicationUser user = await _userManager.FindByIdAsync(currentUserID);
            DateTime now = DateTime.Now;
            long now_timestamp = new DateTimeOffset(now).ToUnixTimeSeconds();
            IQueryable<QRCode> qrs_in_db = db.QRCodes.Where(p => p.User.Id == currentUserID && p.IsGuest == true);
            List<QRView> codes = new List<QRView>();
            foreach (QRCode one_qr_in_db in qrs_in_db)
            {
                QRView code = new QRView();
                code.Code = one_qr_in_db.Code;
                code.Validity = one_qr_in_db.Validity;
                code.StartValidity = one_qr_in_db.StartValidity;
                code.Created = one_qr_in_db.Created;
                code.IsGuest = one_qr_in_db.IsGuest;
                code.Client_Name = one_qr_in_db.Client_Name;
                code.Client_Phone = one_qr_in_db.Client_Phone;
                code.Id = one_qr_in_db.Id;
                codes.Add(code);
            }
            return Ok(codes);
        }

        [HttpPost]
        [Route("AddGuestQr")]
        //POST : /api/QRKey/AddGuestQr
        public async Task<IActionResult> AddGuestQr(AddGuestQRmodel model)
        {
            ClaimsPrincipal currentUser = this.User;
            var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            ApplicationUser user = await _userManager.FindByIdAsync(currentUserID);
            DateTime now = DateTime.Now;
            long now_timestamp = new DateTimeOffset(now).ToUnixTimeSeconds();
            long max_start_valid = new DateTimeOffset(now.AddDays(7)).ToUnixTimeSeconds();
            if (model.StartValidity > max_start_valid) {
                return BadRequest("Дата начала должна быть не больше 7 дней от настоящего времени");
            }
            if ((model.Validity - model.StartValidity) > 1209600) {
                return BadRequest("Срок действия пригласительного QR не должен превышать 14 дней");
            }
            QRCode newQr = new QRCode
            {
                Code = RandomString(16),
                Created = now_timestamp,
                IsGuest = true,
                StartValidity = model.StartValidity,
                Client_Name = model.Client_Name,
                Client_Phone = model.Client_Phone,
                Validity = model.Validity,
                User = user
            };
            db.QRCodes.Add(newQr);
            db.SaveChanges();

            IQueryable<QRCode> qrs_in_db = db.QRCodes.Where(p => p.User.Id == currentUserID && p.IsGuest == true);
            List<QRView> codes = new List<QRView>();
            foreach (QRCode one_qr_in_db in qrs_in_db)
            {
                QRView code = new QRView();
                code.Code = one_qr_in_db.Code;
                code.Validity = one_qr_in_db.Validity;
                code.StartValidity = one_qr_in_db.StartValidity;
                code.Created = one_qr_in_db.Created;
                code.IsGuest = one_qr_in_db.IsGuest;
                code.Client_Name = one_qr_in_db.Client_Name;
                code.Client_Phone = one_qr_in_db.Client_Phone;
                code.Id = one_qr_in_db.Id;
                codes.Add(code);
            }
            return Ok(codes);
        }

        [HttpGet]
        [Route("ResetGuestQr")]
        //GET : /api/QRKey/ResetGuestQr
        public async Task<IActionResult> ResetGuestQr(int id)
        {
            ClaimsPrincipal currentUser = this.User;
            var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            ApplicationUser user = await _userManager.FindByIdAsync(currentUserID);
            DateTime now = DateTime.Now;
            long now_timestamp = new DateTimeOffset(now).ToUnixTimeSeconds();
            QRCode qr_in_db = db.QRCodes.FirstOrDefault(p => p.User.Id == currentUserID && p.IsGuest == true && p.Id == id);
            if (qr_in_db == null) {
                return NotFound("Запись отсутвует в базе данных");
            }

            if (qr_in_db.Validity >= now_timestamp) {
                qr_in_db.Validity = now_timestamp - 1;
                db.QRCodes.Update(qr_in_db);
                db.SaveChanges();
            }            

            IQueryable<QRCode> qrs_in_db = db.QRCodes.Where(p => p.User.Id == currentUserID && p.IsGuest == true);
            List<QRView> codes = new List<QRView>();
            foreach (QRCode one_qr_in_db in qrs_in_db)
            {
                QRView code = new QRView();
                code.Code = one_qr_in_db.Code;
                code.Validity = one_qr_in_db.Validity;
                code.StartValidity = one_qr_in_db.StartValidity;
                code.Created = one_qr_in_db.Created;
                code.IsGuest = one_qr_in_db.IsGuest;
                code.Client_Name = one_qr_in_db.Client_Name;
                code.Client_Phone = one_qr_in_db.Client_Phone;
                code.Id = one_qr_in_db.Id;
                codes.Add(code);
            }
            return Ok(codes);
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