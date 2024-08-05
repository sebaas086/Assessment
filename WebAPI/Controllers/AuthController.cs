using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login(string username,string password)
        {
            if (User is null)
            {
                return BadRequest("Invalid user request!!!");
            }
            if (username.ToLower() == "admin" && password == "Admin@123")
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom Secret key for authentication"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(issuer: "http://localhost:5101", audience: "http://localhost:4200", claims: new List<Claim>(), expires: DateTime.Now.AddDays(6), signingCredentials: signinCredentials);
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(tokenString);
            }
            return Unauthorized("Please Check your Credentials");
        }
    }
}
