using ArtShop.DTO.ArtImageDTOs;
using ArtShop.Entities.Enums;
using ArtShop.Services.Interfaces;
using ArtShop.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using XAct;
using XAct.Messages;

namespace ArtShop.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ImageContoller : ControllerBase
    {
        private readonly IArtImageService _artImageService;
        public ImageContoller(IArtImageService artImageService)
        {
            _artImageService = artImageService;
        }

        [HttpPost("addImage")]
        public async Task<IActionResult> AddImage([FromBody] AddImageDto addImageDto)
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

                if (addImageDto == null)
                {
                    return BadRequest("Invalid image data.");
                }

                var result =await _artImageService.AddImage(addImageDto, userId);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(new { result.Message });
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("delete{id}")]
        public async Task<IActionResult> DeleteImage(string id)
        {
            try
            {
                if(!Guid.TryParse(id,out Guid imageId))
                {
                    throw new Exception("Id canot be parsed");
                }
                var imageDelete = await _artImageService.DeleteImage(imageId);

                return Ok(new {imageDelete.Message});
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("GetImages")]
        [AllowAnonymous]
        public async Task<IActionResult> GetArtImages([FromQuery]string username = null,[FromQuery] string searchTerm = null, [FromQuery] bool sortByPriceAsc = false,[FromQuery] int pageNumber = 1, [FromQuery] Category? category = null, [FromQuery] bool? inStock = null)
        {
            try
            {
                var paginatedImages = await _artImageService.GetArtImages(username,searchTerm,pageNumber, category, inStock,sortByPriceAsc);
                return Ok(new{ paginatedImages});
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [HttpGet("GetById{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetImageById(Guid id)
        {
            try
            {
                var image =await _artImageService.GetImageById(id);
                if(image == null)
                {
                    return NotFound(new { Message = "There is no such image" });
                }
                return Ok(new { image });
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("users")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var users = await _artImageService.GetUsers();
                return Ok(new { users });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        [HttpPost("import")]
        public async Task<IActionResult> ImportImagesFromJson()
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

                await _artImageService.ImportImagesFromJson(userId);
                return Ok("Images imported successfully for the user.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
