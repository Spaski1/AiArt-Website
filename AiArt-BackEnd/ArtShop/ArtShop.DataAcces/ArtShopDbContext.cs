using ArtShop.Entities.Entities;
using Microsoft.EntityFrameworkCore;


namespace ArtShop.DataAcces
{
    public class ArtShopDbContext : DbContext
    {
        public ArtShopDbContext(DbContextOptions<ArtShopDbContext> options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
                optionsBuilder.UseSqlServer("Server=SPASE\\SQLEXPRESS;Database=ArtShop;Trusted_Connection=true;TrustServerCertificate=true;");
        }

        public DbSet<ArtImage> Images { get; set; }
        public DbSet<User> Users { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.Images)
                .WithOne(x=>x.User)
                .HasForeignKey(i => i.UserId)
                .OnDelete(DeleteBehavior.Cascade);
                      

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ArtShopDbContext).Assembly);
        }


    }
}
