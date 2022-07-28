using CoatesWebsite.DAL.Contracts;
using CoatesWebsite.DataModels;
using CoatesWebsite.ViewModels;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.DAL
{
    public class PictureDAL : IPictureDAL
    {
        private CoatesContext _context = null;
        public PictureDAL(CoatesContext coatesContext)
        {
            _context = coatesContext ?? throw new ArgumentNullException(nameof(coatesContext));
        }

        private const string pathDb = "/assets/img/uploads";

        public async Task<int> Add(PictureVm request)
        {
            var files = GetAll().Result;
            
            
            //add details to database
            string fileName = request.Photo.FileName;
            Guards.Guards.FileNameIsUnique(files, fileName);
            string fileNameWithPathDb = Path.Combine(pathDb, fileName);
            var picture = new Pictures
            {
                Name = request.Name,
                PictureCategory = request.PictureCategory,
                ProjectName = request.ProjectName,
                Path = fileNameWithPathDb
            };

            _context.Pictures.Add(picture);
            await _context.SaveChangesAsync();

            return picture.Id;
        }
        public async Task<bool> Edit(PictureUpdateVm pictureUpdateVm)
        {

            Pictures picture = _context.Pictures.FirstOrDefault(x => x.Id == pictureUpdateVm.Id);

            //Update database details
            picture.Name = pictureUpdateVm.Name;
            picture.PictureCategory = pictureUpdateVm.PictureCategory;
            picture.ProjectName = pictureUpdateVm.ProjectName;

            int updated = await _context.SaveChangesAsync();

            return updated > 0;
        }
        public async Task<bool> Delete(PictureUpdateVm pictureUpdateVm)
        {
            
            //get picture details
            Pictures picture = _context.Pictures.FirstOrDefault(x => x.Id == pictureUpdateVm.Id);
            if (picture == null) return false;

            //delete database entry
            _context.Pictures.Remove(picture);
            int deleted = await _context.SaveChangesAsync();

            return true;
        }
        public async Task<List<Pictures>> GetAll()
        {
            var data = await _context.Pictures.ToListAsync<Pictures>();
            return data;
        }
        public async Task<PictureUpdateVm> GetById(int id)
        {
            Pictures picture = await _context.Pictures.FirstOrDefaultAsync(x => x.Id == id);

            PictureUpdateVm pictureVm = new PictureUpdateVm()
            {
                Name = picture.Name,
                ProjectName = picture.ProjectName,
                PictureCategory = picture.PictureCategory,
                Id = id
            };
            return pictureVm;
        }
    }
}
