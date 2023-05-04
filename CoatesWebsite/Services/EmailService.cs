using CoatesWebsite.DataModels;
using System;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;


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
            var apiKey = Environment.GetEnvironmentVariable("SEND_GRID_API_KEY");
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