using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Models
{
    public class EmailVm
    {
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string Message { get; set; }
    }
}
