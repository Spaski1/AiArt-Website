using ArtShop.DataAcces;
using ArtShop.DTO.UserDTOs;
using ArtShop.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using System.Security.Claims;
using XAct;

namespace ArtShop.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUser)
        {
            try
            {
                var result = await _userService.Register(registerUser);

                if (!result.Success)
                {
                    return BadRequest(new { message = result.Message });
                }

                return Ok(new { message = result.Message });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUser)
        {
            try
            {
                var result = await _userService.Login(loginUser);

                if (!result.Success)
                {
                    return BadRequest(new { message = result.Message });
                }

                return Ok(new
                {
                    token = result.Token,
                    userFullName = result.UserFullName
                });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] UpdateUserDto updateUser)
        {
            try
            {
                var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (id == null)
                {
                    return Unauthorized("User is not logged in.");
                }

                if (!Guid.TryParse(id, out Guid userId))
                {
                    return BadRequest("Invalid user ID format.");
                }

                var result = await _userService.Update(userId, updateUser);

                if (!result.Success)
                {
                    return BadRequest(new { message = result.Message });
                }

                return Ok(new { message = result.Message });
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("userInfo")]
        public async Task<IActionResult> UserInfo()
        {
            try
            {
                var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userIdString == null)
                {
                    return Unauthorized("User is not logged in.");
                }

                if (!Guid.TryParse(userIdString, out Guid userId))
                {
                    return BadRequest("Invalid user ID format.");
                }

                var userInfo = await _userService.UserInfo(userId);

                if (userInfo == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent);
                }

                return Ok(new { userInfo });
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
