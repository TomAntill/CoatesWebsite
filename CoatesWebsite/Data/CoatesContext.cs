using CoatesWebsite.Data.Enums;
using CoatesWebsite.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoatesWebsite.ViewModels;

namespace CoatesWebsite.DataModels
{
    public class CoatesContext : IdentityDbContext<IdentityUser>
    {
        public CoatesContext()
        {

        }
        public CoatesContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Email> Email { get; set; }
        public DbSet<Pictures> Pictures { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("Filename=CoatesSite.db");
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Email>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.EmailAddress).IsRequired();
            });
            modelBuilder.Entity<Pictures>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).IsRequired();
            });
        }
        //public DbSet<CoatesWebsite.ViewModels.PictureUpdateVm> PictureUpdateVm { get; set; }
    }
}
