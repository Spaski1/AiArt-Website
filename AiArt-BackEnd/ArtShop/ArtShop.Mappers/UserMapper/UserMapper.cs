using ArtShop.DTO.UserDTOs;
using ArtShop.Entities.Entities;

namespace ArtShop.Mappers.UserMapper
{
    public static class UserMapper
    {
        public static User ToUser(this RegisterUserDto registerUserDto)
        {
            return new User()
            {
                FirstName = registerUserDto.FirstName,
                LastName = registerUserDto.LastName,
                Email = registerUserDto.Email,
                UserName = registerUserDto.UserName,
                CardNo = registerUserDto.CardNo,
                ExpireDate = registerUserDto.ExpireDate
            };
        }
        public static UserDto ToUserDto(this User user)
        {
            return new UserDto()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
            };
        }
    }
}
