using CoatesWebsite.DataModels;
using CoatesWebsite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Data.Services
{
    public class EmailService : IEmailService
    {
        private readonly CoatesContext _context;
        public EmailService(CoatesContext context)
        {
            _context = context;
        }
        public async Task<int> Add(Email email)
        {
            _context.Email.Add(email);
            await _context.SaveChangesAsync();
            return email.Id;
        }
    }
}
