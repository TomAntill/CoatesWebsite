using CoatesWebsite.DataModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CoatesWebsite.Controllers
{
    public class BaseController : Controller
    {
        private readonly CoatesContext _context;
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly ILogger<BaseController> _logger;

        public BaseController(CoatesContext context, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, ILogger<BaseController> logger) : this(context)
        {
            this.userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            this.signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public BaseController(CoatesContext context)
        {
            _context = context;
        }

        public void IsUserAuthorised(string roleId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = _context.UserRoles.SingleOrDefault(x => x.UserId == userId && x.RoleId == roleId);
            if (user == null)
                RedirectToAction("login", "user");
        }
    }
}
