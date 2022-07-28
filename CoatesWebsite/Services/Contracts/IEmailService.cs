using CoatesWebsite.DataModels;
using CoatesWebsite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Data.Services
{
    public interface IEmailService
    {
        public Task<int> Add(Email email);
    }
}
