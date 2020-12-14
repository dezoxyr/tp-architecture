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
    public class ReservationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ReservationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Reservations
        public async Task<List<Reservation>> ListReservationofUser(int userID)
        {

            return await _context.Reservation.Include(p => p.Flight).Where(p => p.UserID == userID).ToListAsync();
        }
        [HttpPost]
        public async Task<IActionResult> AddReservation(int userID, int flightID)
        {
            var reser = new Reservation() { UserID = userID, FlightID = flightID };
            await _context.Reservation.AddAsync(reser);
            if(await _context.SaveChangesAsync()!= 0)
                return Ok(reser);
            return BadRequest();
        }

      
       
    }
}
