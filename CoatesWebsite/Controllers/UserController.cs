using CoatesWebsite.Areas.Identity.Pages.Account;
using CoatesWebsite.DataModels;
using CoatesWebsite.Models;
using CoatesWebsite.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CoatesWebsite.Controllers
{
    public class UserController : Controller
    {
        private readonly CoatesContext _context;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;

        public UserController(CoatesContext context, SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Add(ApplicationUserVm request)
        {

            var user = new IdentityUser
            {
                UserName = request.Email,
                NormalizedUserName = request.Email,
                Email = request.Email,
                NormalizedEmail = request.Email,
                EmailConfirmed = true,
            };

            Regex r = new Regex(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^'&*-]).{8,}$");

            if (r.IsMatch(request.Password))
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                string Id = user.Id;

                var userCreated = await _userManager.FindByIdAsync(Id);
                var token = await _userManager.GeneratePasswordResetTokenAsync(userCreated);
                var result = await _userManager.ResetPasswordAsync(userCreated, token, request.Password);

                return RedirectToAction("Login");
            }
            //else password incorrect


            return RedirectToAction("Login");

        }
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(ApplicationLoginUserVm model, string returnUrl)
        {
            returnUrl = returnUrl ?? Url.Content("~/");

            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, 
                // set lockoutOnFailure: true
                var user = await _userManager.FindByEmailAsync(model.Email);
                var result = await _signInManager.PasswordSignInAsync(model.Email,
                                   model.Password, model.RememberMe, lockoutOnFailure: true);
                if (result.Succeeded)
                {
                    TempData["Success"] = "Login Successful";
                    await _userManager.AddClaimAsync(user, new Claim("UserRole", "Admin"));
                    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                    bool val1 = User.Identity.IsAuthenticated;
                    return RedirectToAction("Index", "Pictures");
                }
                if (result.IsLockedOut)
                {
                    TempData["Failure"] = "Locked out";
                    return RedirectToPage("./Lockout");
                }
                else
                {
                    TempData["Failure"] = "Login Failed";
                    return View();
                }
            }

            // If we got this far, something failed, redisplay form
            return View();
        }

    }
}
