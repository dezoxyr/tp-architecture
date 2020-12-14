using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using VolsREs.Models;

namespace VolsREs.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<VolsREs.Models.User> User { get; set; }
        public DbSet<VolsREs.Models.Flight> Flight { get; set; }
        public DbSet<VolsREs.Models.Reservation> Reservation { get; set; }
    }
}
