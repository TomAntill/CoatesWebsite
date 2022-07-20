using CoatesWebsite.DataModels;
using CoatesWebsite.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Guards
{
    public class Guards
    {
        public static void FileNameIsUnique(string fileName)
        {
            //inject database
            CoatesContext _context = new CoatesContext();
            
            //Check database for fileName
            Pictures picture = _context.Pictures.FirstOrDefault(x => x.Path == fileName);

            //If exists throw exception
            if (picture != null)
            {
                throw new FileNameAlreadyExistsException("File name already exists");
            }
        }
        public static void FileSizeToLarge(long fileSize)
        {
            if (fileSize > 5000000)
            {
                throw new FileSizeTooLargeException("File size too large");
            }
        }
        public static void InvalidFileExtension(string fileExtension)
        {
            if (fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".png"
                && fileExtension != ".webp" && fileExtension != ".avif" && fileExtension != ".heic"
                && fileExtension != ".heif")
            {
                throw new InvalidFileExtensionException("File extension incorrect");
            }
        }


    }
}
