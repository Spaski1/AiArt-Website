using ArtShop.Entities.Enums;

namespace ArtShop.DTO.ArtImageDTOs
{
    public class AddImageDto
    {
        public string Description { get; set; }
        public Category Category { get; set; }
        public string Price { get; set; }
        public string ImageUrl { get; set; }
    }
}
