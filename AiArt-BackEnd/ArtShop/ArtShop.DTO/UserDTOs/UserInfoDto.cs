using ArtShop.DTO.ArtImageDTOs;

namespace ArtShop.DTO.UserDTOs
{
    public class UserInfoDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string CardNo { get; set; }
        public string ExpireDate { get; set; }
        public List<ArtImageDto> BoughtImages { get; set; }
        public List<ArtImageDto> SoldImages { get; set; }

    }
}
