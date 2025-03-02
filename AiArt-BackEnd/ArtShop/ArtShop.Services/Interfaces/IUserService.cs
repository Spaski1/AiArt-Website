using ArtShop.DTO.UserDTOs;

namespace ArtShop.Services.Interfaces
{
    public interface IUserService
    {
        Task<RegisterUserResultDto> Register(RegisterUserDto registerUser);
        Task<LoginUserResultDto> Login(LoginUserDto loginUser);
        Task<UpdateUserResultDto> Update(Guid userId,UpdateUserDto updateUser);
        Task<UserInfoDto> UserInfo(Guid id);
    }
}
