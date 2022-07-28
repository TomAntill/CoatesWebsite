using CoatesWebsite.DataModels;
using CoatesWebsite.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CoatesWebsite.Guards;
using CoatesWebsite.Data.Enums;
using CoatesWebsite.Data.Services;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using CoatesWebsite.DAL.Contracts;

namespace CoatesWebsite.Controllers
{
    [Authorize]
    public class PicturesController : BaseController
    {
        private const string ADMIN_ROLE_CODE = "admin";
        private readonly CoatesContext _context;
        private readonly ILogger<PicturesController> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private IPictureDAL _pictureDAL = null;

        public PicturesController(CoatesContext context, ILogger<PicturesController> logger, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IPictureDAL pictureDAL) : base (context, userManager, signInManager, logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            this.signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            _pictureDAL = pictureDAL ?? throw new ArgumentNullException(nameof(pictureDAL));
        }

        public IActionResult Index()
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);
            var data = _pictureDAL.GetAll().Result;
            return View(data);
        }

        [HttpGet]
        public IActionResult Details(int id)
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);
            var pictureVm = _pictureDAL.GetById(id).Result;
            return View(pictureVm);
        }

        [HttpGet]
        public IActionResult Add()
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Add(PictureVm request)
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);
            await _pictureDAL.Add(request);
            return RedirectToAction("Add");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);
            var pictureUpdateVm = _pictureDAL.GetById(id).Result;
            return View(pictureUpdateVm);
        }

        [HttpPost]
        public IActionResult Edit(PictureUpdateVm pictureUpdateVm)
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);
            _pictureDAL.Edit(pictureUpdateVm);
            return RedirectToAction(nameof(Index));
        }
        [HttpGet]
        public IActionResult Delete(int id)
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);
            var pictureUpdateVm = _pictureDAL.GetById(id).Result;
            return View(pictureUpdateVm);
        }
        [HttpPost, ActionName("Delete")]
        public IActionResult Delete(PictureUpdateVm pictureUpdateVm)
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);
            var result = _pictureDAL.Delete(pictureUpdateVm);

            if (result.Result == false)
            {
                return View("NotFound");
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
