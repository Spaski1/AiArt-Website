using ArtShop.DataAcces;
using ArtShop.DTO.ArtImageDTOs;
using ArtShop.DTO.UserDTOs;
using ArtShop.Entities.Entities;
using ArtShop.Entities.Enums;
using ArtShop.Mappers.ImageMapper;
using ArtShop.Mappers.UserMapper;
using ArtShop.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using XAct;

namespace ArtShop.Services.Services
{
    public class ArtImageService : IArtImageService
    {
        private readonly ArtShopDbContext _dbContext;

        public ArtImageService(ArtShopDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AddImageResultDto> AddImage(AddImageDto addImage, Guid userId)
        {
            if (string.IsNullOrEmpty(addImage.Description))
            {
                return new AddImageResultDto { Success = false, Message = "Image Description cannot be empty!" };
            }

            if (string.IsNullOrEmpty(addImage.ImageUrl))
            {
                return new AddImageResultDto { Success = false, Message = "Must provide ImageUrl!" };
            }

            var user = await _dbContext.Users.FindAsync(userId);

            if (user == null)
            {
                return new AddImageResultDto { Success = false, Message = "User does not exist" };
            }

            var artImage = addImage.ToArtImage();

            var image = new ArtImage
            {
                Id = Guid.NewGuid(),
                Description = artImage.Description,
                ImageUrl = artImage.ImageUrl,
                Category = artImage.Category,
                Price = artImage.Price,
                Stock = true,
                UserId = userId,
                CreatedAt = DateTime.Now.ToString(),
            };

            await _dbContext.Images.AddAsync(image);
            await _dbContext.SaveChangesAsync();

            return new AddImageResultDto { Success = true, Message = "Image added successfully" };
        }

        public async Task<DeleteImageResponse> DeleteImage(Guid id)
        {
            if(id == null)
            {
                throw new Exception("Id cannot be empty");
            }

            var image = _dbContext.Images.Find(id);

            if(image == null)
            {
                throw new Exception("There is no such Image");
            }

            _dbContext.Images.Remove(image);
            await _dbContext.SaveChangesAsync();

            return new DeleteImageResponse
            {
                Success = true,
                Message = "Image was deleted succesfuly"
            };
        }

        public async Task<PaginatedResult<ArtImageDto>> GetArtImages(
            string? username = null,
            string? searchTerm = null,
            int pageNumber = 1,
            Category? category = null,
            bool? inStock = null,
            bool sortByPriceAsc = false
            )
        {
            var query = _dbContext.Images.AsQueryable();

            if (category.HasValue)
            {
                query = query.Where(a => a.Category == category.Value);
            }

            if (inStock.HasValue)
            {
                query = query.Where(a => a.Stock == inStock.Value);
            }

            if (!string.IsNullOrEmpty(searchTerm))
            {
                searchTerm = searchTerm.ToLower();
                query = query.Where(a => a.Description.ToLower().Contains(searchTerm));
            }

            if (!string.IsNullOrEmpty(username))
            {
                var usernameTolower = username.ToLower();
                query = query.Where(a => a.User.UserName == usernameTolower);
            }

            if (sortByPriceAsc)
            {
                query = query.OrderBy(a => a.Price);
            }
            else
            {
                query = query.OrderByDescending(a => a.Price);
            }

            var totalCount = await query.CountAsync();

            var artImagesDto = await query.Skip((pageNumber - 1) * 15)
                                    .Take(15)
                                    .Select(a => new ArtImageDto
                                    {
                                        Id = a.Id,
                                        Description = a.Description,
                                        ImageUrl = a.ImageUrl,
                                        Price = a.Price,
                                        Stock = a.Stock,
                                        CreatedAt = a.CreatedAt,
                                        Category = a.Category.ToString(),
                                        UserId = a.UserId
                                    })
                                    .ToListAsync();


            return new PaginatedResult<ArtImageDto>
            {
                Data = artImagesDto,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = 15,
                TotalPages = (int)Math.Ceiling(totalCount / (double)15)
            };
        }



        public async Task<ArtImage> GetImageById(Guid id)
        {
            var image = await _dbContext.Images.FindAsync(id);
            if(image == null)
            {
                throw new Exception("There is no such image");
            }

            return image ;
        }

        public async Task<List<UserDto>> GetUsers()
        {
            var usersWithImagesDto = await _dbContext.Users
                                                .Where(x => x.Images.Count >= 1)
                                                .Select(user => user.ToUserDto())
                                                .ToListAsync();


            return new List<UserDto>
            {
                usersWithImagesDto
            };
        }


        public async Task ImportImagesFromJson(Guid userId)
        {
            var jsonPath = "C:\\Users\\spase\\source\\repos\\AiArtJson\\images.json";

            var jsonData = await File.ReadAllTextAsync(jsonPath);
            var artImagesJsonDto = JsonConvert.DeserializeObject<List<ArtImagesJsonDto>>(jsonData);

            var artImages = new List<ArtImage>();

            foreach (var dto in artImagesJsonDto)
            {

                if (dto.Category == "Art & Designs" || dto.Category == "Black & White" 
                                                    || dto.Category == "Charcoal & Chalk & Pastel")
                {
                    var cleanedCategory = dto.Category.Replace("&", "And");

                    cleanedCategory = cleanedCategory.Replace(" ", "");

                    if (!Enum.TryParse(cleanedCategory, out Category categoryEnum))
                    {
                        throw new ArgumentException($"Invalid category: {dto.Category}");
                    }

                    var artImage = new ArtImage
                    {
                        Id = Guid.NewGuid(),
                        Description = dto.Description,
                        ImageUrl = dto.ImageUrl,
                        Category = categoryEnum,
                        Price = dto.Price,
                        Stock = true,
                        UserId = userId,
                        CreatedAt = DateTime.Now.ToString(),
                    };

                    artImages.Add(artImage);
                }
                else
                {
                    if (!Enum.TryParse(dto.Category, out Category categoryEnum))
                    {
                        throw new ArgumentException($"Invalid category: {dto.Category}");
                    }

                    var artImage = new ArtImage
                    {
                        Id = Guid.NewGuid(),
                        Description = dto.Description,
                        ImageUrl = dto.ImageUrl,
                        Category = categoryEnum,
                        Price = dto.Price,
                        Stock = true,
                        UserId = userId,
                        CreatedAt = DateTime.Now.ToString(),
                    };

                    artImages.Add(artImage);
                }
            }

            _dbContext.Images.AddRange(artImages);
            await _dbContext.SaveChangesAsync();

        }

    }
}
