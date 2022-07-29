using CoatesWebsite.DAL;
using CoatesWebsite.DataModels;
using CoatesWebsite.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Data.Services
{
    public class MediaService : IMediaService
    {
        private readonly CoatesContext _context;
        public MediaService(CoatesContext context)
        {
            _context = context;
        }
        private const string path = "/Users/Thoma/source/repos/CoatesWebsite - Copy/CoatesWebsite/wwwroot/assets/img/uploads";
        private const string pathDb = "/Users/Thoma/source/repos/CoatesWebsite - Copy/CoatesWebsite/wwwroot";


        public async Task<FileStream> Add(PictureVm request)
        {
            //Add file to root

            string fileName = request.Photo.FileName;
            long fileSize = request.Photo.Length;
            string fileExt = Path.GetExtension(fileName);

            string fileNameWithPath = Path.Combine(path, fileName);

            Guards.Guards.FileSizeToLarge(fileSize);
            Guards.Guards.InvalidFileExtension(fileExt);

            using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
            {
                await request.Photo.CopyToAsync(stream);

                return stream;
            }
            //System.IO.File.Move(request.Photo.FileName, request.Name + Path.GetExtension(request.Photo.FileName));
        }
        public async Task<bool> Delete(PictureUpdateVm pictureUpdateVm)
        {
            Pictures picture = _context.Pictures.FirstOrDefault(x => x.Id == pictureUpdateVm.Id);
            if (picture == null) return false;

            var pathToDelete = pathDb + picture.Path;
            System.IO.File.Delete(pathToDelete);

            return true;
        }
    }
}
