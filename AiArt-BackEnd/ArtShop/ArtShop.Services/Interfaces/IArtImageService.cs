using ArtShop.DTO.ArtImageDTOs;
using ArtShop.DTO.UserDTOs;
using ArtShop.Entities.Entities;
using ArtShop.Entities.Enums;

namespace ArtShop.Services.Interfaces
{
    public interface IArtImageService
    {
        Task<PaginatedResult<ArtImageDto>> GetArtImages(string username, string searchTerm,int pageNumber, Category? category, bool? inStock, bool sortByPriceAsc);
        Task<ArtImage> GetImageById(Guid id);
        Task<List<UserDto>> GetUsers();
        Task<AddImageResultDto> AddImage(AddImageDto addimage,Guid userId);
        Task<DeleteImageResponse> DeleteImage(Guid id);
        Task ImportImagesFromJson(Guid userId);
    }
}
