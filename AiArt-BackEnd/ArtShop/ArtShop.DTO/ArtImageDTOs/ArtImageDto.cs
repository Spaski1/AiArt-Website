

namespace ArtShop.DTO.ArtImageDTOs
{
    public class ArtImageDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int Price { get; set; }
        public bool Stock { get; set; }
        public string ImageUrl { get; set; }
        public string CreatedAt { get; set; }
        public Guid UserId { get; set; }
    }
}
