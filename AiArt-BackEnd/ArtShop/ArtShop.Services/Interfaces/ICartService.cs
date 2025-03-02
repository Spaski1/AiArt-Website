using ArtShop.DTO.ArtImageDTOs;
using ArtShop.DTO.CartDto;

namespace ArtShop.Services.Interfaces
{
    public interface ICartService
    {
        Task<CheckOutResult> CheckOutAuthorized(List<Guid> imageId, Guid userId);
        Task<CheckOutResult> CheckOutUnauthorized(List<Guid> imageId);
        Task<List<ArtImageDto>> BoughtImages (Guid userId);
    }
}
