using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EnglishCenter.Models;

namespace EnglishCenterPro.Data
{
    public class EnglishCenterProContext : DbContext
    {
        public EnglishCenterProContext (DbContextOptions<EnglishCenterProContext> options)
            : base(options)
        {
        }

        public DbSet<EnglishCenter.Models.Course> Course { get; set; }

        public DbSet<EnglishCenter.Models.News> News { get; set; }
    }
}
