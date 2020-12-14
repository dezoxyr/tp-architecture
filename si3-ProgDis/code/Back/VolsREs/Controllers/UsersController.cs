using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using VolsREs.Data;
using VolsREs.Models;

namespace VolsREs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

     
       
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User tser)
        {

            if (!await UserExists(tser.login))
            {
                var user = new User() { login = tser.login };
                await _context.User.AddAsync(user);
                await _context.SaveChangesAsync();
                return Ok("User Added");
                }
            
            return BadRequest("fghj");
        }
        public async Task<bool> UserExists(string username)
        {
            var user = await _context.User.FirstOrDefaultAsync(p => p.login == username);
            if (user != null)
                return true;
            return false;
        }
        
    }
}
