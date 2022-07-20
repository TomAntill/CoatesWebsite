using CoatesWebsite.Data.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Data.Services
{
    public interface ICategoryService
    {
        public List<string> GetPicturePathForCategory(PictureCategory pictureCategory);
    }
}
