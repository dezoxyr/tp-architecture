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
    public class FlightsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public FlightsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<List<Flight>> GetFlights()
        {
            return await _context.Flight.ToListAsync();
        }
        
    }
}
