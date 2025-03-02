

namespace ArtShop.DTO.UserDTOs
{
    public class LoginUserResultDto
    {
        public bool Success { get; set; }
        public string Token { get; set; }
        public string UserFullName { get; set; }
        public string Message { get; set; }
    }
}
