using ArtShop.Entities.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace SEDC.Movies.DataAccess.FluentConfig
{
    public class UserFluentConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(x => x.UserName)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.Password)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(x => x.FirstName)
                .HasMaxLength(150);

            builder.Property(x => x.LastName)
                .HasMaxLength(150);

            builder.Ignore(x => x.FullName);

            builder.Property(u => u.CreatedAt)
                .IsRequired();

            builder.Property(u => u.CardNo)
                .IsRequired()
                .HasMaxLength(20);

            builder.Property(u => u.ExpireDate)
                .IsRequired();

        }
    }
}
