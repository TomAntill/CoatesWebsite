using CoatesWebsite.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.Data.Services
{
    public interface IMediaService
    {
        public Task<FileStream> Add(PictureVm request);
        public Task<bool> Delete(PictureUpdateVm pictureUpdateVm);
    }
}
