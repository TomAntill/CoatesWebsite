using CoatesWebsite.DataModels;
using CoatesWebsite.Exceptions;
using CoatesWebsite.Validation;
using CoatesWebsite.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Guards
{
    public class Guards
    {
        public static void FileNameIsUnique(List<Pictures> files, string fileName)
        {
            foreach (Pictures file in files)
            {
                var strimmedName = Helpers.StrimPictureName(file.Path);
                //string file name
                // "/assets/img/uploads\\balcony.jpg"
                // "gallery2.jpg"

                if (fileName == strimmedName)
                {
                    throw new FileNameAlreadyExistsException("File name already exists");
                }
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
