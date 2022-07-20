using CoatesWebsite.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.DataModels
{
    public class Pictures
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        public string Path { get; set; }
        [Display(Name = "Picture Category")]
        public PictureCategory PictureCategory { get; set; }
        [Display(Name = "Project Name")]
        public ProjectName ProjectName { get; set; }
    }
}
