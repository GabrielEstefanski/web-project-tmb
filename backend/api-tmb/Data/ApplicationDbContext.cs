using ApiTmb.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiTmb.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Order> Orders { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Order>()
                .Property(o => o.Id)
                .HasColumnType("uuid");

            modelBuilder.Entity<Order>()
                .Property(o => o.Valor)
                .HasColumnType("decimal(18,2)");
        }
    }
}
