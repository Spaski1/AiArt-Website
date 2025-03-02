using ArtShop.Entities.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArtShop.DataAcces.FluentConfig
{
    public class ArtImageFlunetConfig : IEntityTypeConfiguration<ArtImage>
    {
        public void Configure(EntityTypeBuilder<ArtImage> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Description)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(x => x.Price)
                .IsRequired();

            builder.Property(x => x.Stock)
                .IsRequired();

            builder.Property(x => x.ImageUrl)
                .IsRequired();

            builder.Property(ai => ai.CreatedAt)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.Category)
                .IsRequired()
                .HasConversion<int>();

            builder.HasOne(x => x.User)
                .WithMany(u => u.Images)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(x => x.BoughtByUserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne<User>()
                .WithMany()
                .HasForeignKey(x => x.SoldByUserId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
