using CoatesWebsite.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CoatesWebsite.Validation
{
    public class Helpers
    {
        public static void CleanUpPaths(IndexVm indexVm)
        {
            var x = Directory.GetCurrentDirectory();

            // clean up paths
            foreach (var item in indexVm.PictureVms)
            {
                item.Path = item.Path.Replace(x, "");
                item.Path = item.Path.Replace("\\", "/");
                item.Path = item.Path.Replace("wwwroot", "");
                item.Path = item.Path.Replace("//", "");
            }
        }

        public static bool PasswordFormatValidation(ApplicationUserVm request)
        {
            Regex r = new Regex(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^'&*-]).{8,}$");

            if (r.IsMatch(request.Password))
            {
                return true;
            }
            return false;
        }
        public static string StrimPictureName(string name)
        {

            string strimmedName = name.Substring(20);
            return strimmedName;
        }

    }
}
