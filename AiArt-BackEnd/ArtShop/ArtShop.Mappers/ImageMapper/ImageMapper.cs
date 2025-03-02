using ArtShop.DTO.ArtImageDTOs;
using ArtShop.Entities.Entities;

namespace ArtShop.Mappers.ImageMapper
{
    public static class ImageMapper
    {
        public static ArtImage ToArtImage(this AddImageDto image)
        {
            var price = int.Parse(image.Price);

            return new()
            {
                Description = image.Description,
                Category = image.Category,
                Price = price,
                ImageUrl = image.ImageUrl
            };

        }
        public static AddImageDto ToArtImageDto(this ArtImage image)
        {
            return new()
            {
                Description = image.Description,
                Category = image.Category,
                Price = image.Price.ToString(),
                ImageUrl = image.ImageUrl,
            };
        }

        public static ArtImageDto ToBoughtImages(this ArtImage image)
        {
            return new()
            {
                Id = image.Id,
                Description = image.Description,
                Category = image.Category.ToString(),
                Price = image.Price,
                Stock = image.Stock,
                ImageUrl = image.ImageUrl,
                CreatedAt = image.CreatedAt,
                UserId = image.UserId
            };

        }

        public static ArtImageDto ToUserInfoImages(this ArtImage image)
        {
            return new()
            {
                Id = image.Id,
                Description = image.Description,
                Category = image.Category.ToString(),
                Price = image.Price,
                Stock = image.Stock,
                ImageUrl = image.ImageUrl,
                CreatedAt = image.CreatedAt,
                UserId = image.UserId
            };

        }
    }
}
