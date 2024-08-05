using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NLog;
using WebAPI.DAL.Services;
using WebAPI.Models.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ILogger<ContactsController> _logger;
        private readonly ContactService contactService;
        public ContactsController(ContactService contactService, ILogger<ContactsController> logger)
        {
            this.contactService = contactService;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("GetList")]
        public async Task<IActionResult> GetAllContacts()
        {
            _logger.LogInformation("[Controller]: Get List");
            try
            {
                var contacts = await contactService.GetAllContacts();
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        //[AllowAnonymous]
        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateContact(Contacts contact)
        {
            _logger.LogInformation("[Controller]: Create new contact");
            try
            {
                var contacts = await contactService.CreateContact(contact);
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("edit")]
        public async Task<IActionResult> EditContact(Contacts contact)
        {
            _logger.LogInformation("[Controller]: Edit existing contact");
            try
            {
                await contactService.UpdateContact(contact);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            _logger.LogInformation("[Controller]: Delete contact");
            try
            {
                await contactService.DeleteContact(id);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
