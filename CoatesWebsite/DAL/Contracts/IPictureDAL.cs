using CoatesWebsite.DataModels;
using CoatesWebsite.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoatesWebsite.DAL.Contracts
{
    public interface IPictureDAL
    {
        public Task<int> Add(PictureVm pictureVm);
        public Task<bool> Edit(PictureUpdateVm pictureUpdateVm);
        public Task<bool> Delete(PictureUpdateVm pictureUpdateVm);

        public Task<List<Pictures>> GetAll();
        public Task<PictureUpdateVm> GetById(int id);
    }
}
