using CoatesWebsite.Data.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.ViewModels
{
    public class PictureVm
    {
        public PictureVm(PictureCategory pictureCategory, ProjectName projectName, string path)
        {
            PictureCategory = pictureCategory;
            ProjectName = projectName;
            Path = path;
        }
        public PictureVm()
        {

        }

        //public int Id { get; set; }
        public string Name { get; set; }
        [Display(Name = "Picture Category")]
        public PictureCategory PictureCategory { get; set; }

        [Display(Name = "Project Name")]
        public ProjectName ProjectName { get; set; }

        public IFormFile Photo { get; set; }

        public string Path { get; set; }
    }

}
