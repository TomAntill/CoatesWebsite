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
    }    
}
