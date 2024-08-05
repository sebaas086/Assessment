using Microsoft.EntityFrameworkCore;
using WebAPI.Models.Entity;

namespace WebAPI.Data
{
    public class AppDbContext : DbContext
    {
        //public  AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}
