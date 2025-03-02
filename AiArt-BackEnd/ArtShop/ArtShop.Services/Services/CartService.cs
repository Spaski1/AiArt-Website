using ArtShop.DataAcces;
using ArtShop.DTO.ArtImageDTOs;
using ArtShop.DTO.CartDto;
using ArtShop.Mappers.ImageMapper;
using ArtShop.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ArtShop.Services.Services
{
    public class CartService : ICartService
    {
        private readonly ArtShopDbContext _dbContext;
        public CartService(ArtShopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<CheckOutResult> CheckOutAuthorized(List<Guid> imageId, Guid userId)
        {

            var images = await _dbContext.Images.Where(i => imageId.Contains(i.Id)).ToListAsync();

            if (images == null || images.Count == 0)
            {
                return new CheckOutResult
                {
                    IsChecked = false,
                    Message = "There are no images"
                };
            }

            foreach (var image in images)
            {
                image.BoughtByUserId = userId;
            }
           
            foreach (var image in images)
            {
                image.Stock = false; 

                image.SoldByUserId = image.UserId;
            }

            await _dbContext.SaveChangesAsync();

            return new CheckOutResult
            {
                IsChecked = true,
                Message = "Images Bought Succesfuly"
            };
        }

        public async Task<CheckOutResult> CheckOutUnauthorized(List<Guid> imageId)
        {
            var images = await _dbContext.Images.Where(i => imageId.Contains(i.Id)).ToListAsync();

            if (images == null || images.Count == 0)
            {
                return new CheckOutResult
                {
                    IsChecked = false,
                    Message = "There are no images"
                };
            }

            foreach (var image in images)
            {
                image.Stock = false;

                image.SoldByUserId = image.UserId;
            }

            await _dbContext.SaveChangesAsync();

            return new CheckOutResult
            {
                IsChecked = true,
                Message = "Images Bought Succesfuly"
            };
        }

        public async Task<List<ArtImageDto>> BoughtImages(Guid userId)
        {
            if(userId == null)
            {
                throw new Exception("User does not exist");
            }

            var boughtImages = await _dbContext.Images
                                         .Where(i => i.BoughtByUserId == userId)
                                         .Select(i => i.ToBoughtImages())
                                         .ToListAsync();

            return boughtImages;
        }
    }
}
 