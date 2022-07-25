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

        public PicturesController(CoatesContext context, ILogger<PicturesController> logger, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager) : base (context, userManager, signInManager, logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            this.signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
        }

        public IActionResult Index()
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);

            var data = _context.Pictures.ToList<Pictures>();
            return View(data);
        }

        [HttpGet]
        public IActionResult Details(int id)
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);

            Pictures picture = _context.Pictures.FirstOrDefault(x => x.Id == id);

            PictureUpdateVm pictureVm = new PictureUpdateVm()
            {
                Name = picture.Name,
                ProjectName = picture.ProjectName,
                PictureCategory = picture.PictureCategory
            };

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
            //Add file to root
            string path = "/Users/Thoma/source/repos/CoatesWebsite - Copy/CoatesWebsite/wwwroot/assets/img/uploads";
        //C: \Users\Thoma\source\repos\CoatesWebsite - Copy\CoatesWebsite\wwwroot\assets\img\uploads

            string fileName = request.Photo.FileName;
            long fileSize = request.Photo.Length;
            string fileExt = Path.GetExtension(fileName);

            string fileNameWithPath = Path.Combine(path, fileName);

            Guards.Guards.FileSizeToLarge(fileSize);
            Guards.Guards.FileNameIsUnique(fileNameWithPath);
            Guards.Guards.InvalidFileExtension(fileExt);

            using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
            {
                await request.Photo.CopyToAsync(stream);
            }

            //add details to database
            string pathDb = "/assets/img/uploads";
            string fileNameWithPathDb = Path.Combine(pathDb, fileName);
            var picture = new Pictures
            {
                Name = request.Name,
                PictureCategory = request.PictureCategory,
                ProjectName = request.ProjectName,
                Path = fileNameWithPathDb
            };

            _context.Pictures.Add(picture);
            await _context.SaveChangesAsync();

            return RedirectToAction("Add");
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);
            Pictures picture = _context.Pictures.FirstOrDefault(x => x.Id == id);

            PictureUpdateVm pictureUpdateVm = new PictureUpdateVm()
            {
                Name = picture.Name,
                ProjectName = picture.ProjectName,
                PictureCategory = picture.PictureCategory,
                Id = id
            };
            return View(pictureUpdateVm);
        }

        [HttpPost]
        public IActionResult Edit(PictureUpdateVm pictureUpdateVm)
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);

            Pictures picture = _context.Pictures.FirstOrDefault(x => x.Id == pictureUpdateVm.Id);
          
            //Update database details
            picture.Name = pictureUpdateVm.Name;
            picture.PictureCategory = pictureUpdateVm.PictureCategory;
            picture.ProjectName = pictureUpdateVm.ProjectName;

            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }
        [HttpGet]
        public IActionResult Delete(int id)
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);

            Pictures picture = _context.Pictures.FirstOrDefault(x => x.Id == id);
            PictureUpdateVm pictureUpdateVm = new PictureUpdateVm()
            {
                Name = picture.Name,
                ProjectName = picture.ProjectName,
                PictureCategory = picture.PictureCategory,
                Id = id
            };
            return View(pictureUpdateVm);
        }
        [HttpPost, ActionName("Delete")]
        public IActionResult Delete(PictureUpdateVm pictureUpdateVm)
        {
            IsUserAuthorised(ADMIN_ROLE_CODE);
            //get picture details
            Pictures picture = _context.Pictures.FirstOrDefault(x => x.Id == pictureUpdateVm.Id);
            if (picture == null) return View("NotFound");

            //delete photo in wwwroot
            System.IO.File.Delete(picture.Path);

            //delete database entry
            _context.Pictures.Remove(picture);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }
    }
}
