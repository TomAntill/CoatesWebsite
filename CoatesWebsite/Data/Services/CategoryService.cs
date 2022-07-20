using CoatesWebsite.Data.Enums;
using CoatesWebsite.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Data.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly CoatesContext _context;
        public CategoryService(CoatesContext context)
        {
            _context = context;
        }

        public List<string> GetPicturePathForCategory(PictureCategory pictureCategory)
            {

            var data = _context.Pictures.ToList();
            var categories = new List<string>();

            foreach (Pictures picture in data)
            {
                if (picture.PictureCategory == pictureCategory)
                {
                    categories.Add(picture.Path);
                }
            }
            return categories;
            }

    }
}
