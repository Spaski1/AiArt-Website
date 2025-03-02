using ArtShop.DTO.CartDto;
using ArtShop.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace ArtShop.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("checkout")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckOut([FromBody] List<Guid> imageId)
        {
            try
            {
                var isAuthenticated = User.Identity.IsAuthenticated;

                if (isAuthenticated)
                {
                    var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

                    if (userId == null)
                    {
                        return BadRequest(StatusCodes.Status401Unauthorized);
                    }

                    var responseAuthorized = await _cartService.CheckOutAuthorized(imageId, userId);

                    return new JsonResult(responseAuthorized);
                }

                var responseUnauthorized = await _cartService.CheckOutUnauthorized(imageId);

                return new JsonResult(responseUnauthorized);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("boughtImages")]
        public async Task<IActionResult> BoughtImages()
        {
            try
            {
                var isAuthenticated = User.Identity.IsAuthenticated;

                if (isAuthenticated)
                {
                    var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

                    if (userId == null)
                    {
                        return BadRequest(StatusCodes.Status401Unauthorized);
                    }

                    var response = await _cartService.BoughtImages(userId);

                    return new JsonResult(response);
                }

                return BadRequest(StatusCodes.Status401Unauthorized);

            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


    }
}
