﻿using CoatesWebsite.Data.Services;
using CoatesWebsite.DataModels;
using CoatesWebsite.Models;
using CoatesWebsite.Validation;
using CoatesWebsite.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Controllers
{
    public class HomeController : BaseController
    {
        private readonly IEmailService _service;
        private readonly CoatesContext _context;


        public HomeController(IEmailService emailService, CoatesContext coatesContext) : base(coatesContext)
        {
            _service = emailService;
            _context = new CoatesContext();
        }

        public IActionResult Index()
        {

            IndexVm indexVm = new IndexVm();

            var pictureVms = _context.Pictures.ToList()
                .Select(s => new PictureVm(s.PictureCategory, s.ProjectName, s.Path)).ToList();
            indexVm.PictureVms = pictureVms;

            Helpers.CleanUpPaths(indexVm);
            return View(indexVm);
        }

        [HttpPost]
        public async Task<IActionResult> Index(EmailVm emailVm)
        {
            Email addEmail = new Email
            {
                Name = emailVm.Name,
                EmailAddress = emailVm.EmailAddress,
                Message = emailVm.Message
            };
            await _service.Add(addEmail);
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
