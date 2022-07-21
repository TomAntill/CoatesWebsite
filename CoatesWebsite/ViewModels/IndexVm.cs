using CoatesWebsite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.ViewModels
{
    public class IndexVm
    {
        public EmailVm EmailVm { get; set; } = new EmailVm();

        public List<PictureVm> PictureVms { get; set; } = new List<PictureVm>();

        public List<PictureVm> TregonwellRoadPictureVms => PictureVms.Where(x => x.ProjectName == Data.Enums.ProjectName.TregonwellRoad).ToList();
        public List<PictureVm> PonsfordRoadPictureVms => PictureVms.Where(x => x.ProjectName == Data.Enums.ProjectName.PonsfordRoad).ToList();
        public List<PictureVm> SummerhousePictureVms => PictureVms.Where(x => x.ProjectName == Data.Enums.ProjectName.Summerhouse).ToList();        
    }    
}
