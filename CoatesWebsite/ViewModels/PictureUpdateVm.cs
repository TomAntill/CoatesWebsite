using CoatesWebsite.Data.Enums;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.ViewModels
{
    public class PictureUpdateVm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public PictureCategory PictureCategory { get; set; }
        public ProjectName ProjectName { get; set; }
        [NotMapped] 
        public IFormFile Photo { get; set; }
    }
}
