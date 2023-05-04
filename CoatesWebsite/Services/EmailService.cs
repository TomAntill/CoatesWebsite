using CoatesWebsite.DataModels;
using System;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Configuration;

namespace CoatesWebsite.Data.Services
{
    public class EmailService : IEmailService
    {
        private readonly CoatesContext _context;
        private readonly IConfiguration configuration;

        public EmailService(CoatesContext context, IConfiguration configuration)
        {
            _context = context;
            this.configuration = configuration;
        }

        public async Task<int> Add(Email email)
        {
            var apiKey = configuration.GetSection("SEND_GRID_API_KEY").Value;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("info@coatescarpentry.co.uk", email.EmailAddress);
            var to = new EmailAddress("info@coatescarpentry.co.uk", "Tom");
            var dynamicData = new { from = email.EmailAddress, htmlcontent = email.Message, name = email.Name };
            var msg = MailHelper.CreateSingleTemplateEmail(from, to, "d-e03067452b974a36a39ebd9702aceb8e", dynamicData);
            var response = await client.SendEmailAsync(msg);

            _context.Email.Add(email);
            await _context.SaveChangesAsync();

            return email.Id;
        }
    }
}