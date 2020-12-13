using System;
using System.Collections.Generic;
using APIControllers.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.Extensions.Primitives;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace APIControllers.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private IRepository repository;

        private IWebHostEnvironment webHostEnvironment;

        public ReservationController(IRepository repo, IWebHostEnvironment environment)
        {
            repository = repo;
            webHostEnvironment = environment;
        }


        [HttpGet]
        public IEnumerable<Reservation> Get() => repository.Reservations;

        [HttpGet("{id}")]
        public Reservation Get(int id) => repository[id];

        [HttpPost]
        public Reservation Post([FromBody] Reservation res) =>
        repository.AddReservation(new Reservation
        {
            Prix = res.Prix,
            Depart = res.Depart,
            Arriver = res.Arriver
        });

  

        [HttpPut]
        public Reservation Put([FromForm] Reservation res) => repository.UpdateReservation(res);

        [HttpPatch("{id}")]
        public StatusCodeResult Patch(int id, [FromBody]JsonPatchDocument<Reservation> patch)
        {
            Reservation res = Get(id);
            if (res != null)
            {
                patch.ApplyTo(res);
                return Ok();
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public void Delete(int id) => repository.DeleteReservation(id);

        bool Authenticate()
        {
            var allowedKeys = new[] { "Secret@123", "Secret#12", "SecretABC" };
            StringValues key = Request.Headers["Key"];
            int count = (from t in allowedKeys where t == key select t).Count();
            return count == 0 ? false : true;
        }

        [HttpPost("PostXml")]
        [Consumes("application/xml")]
        public Reservation PostXml([FromBody] System.Xml.Linq.XElement res)
        {
            return repository.AddReservation(new Reservation
            {
                Prix = res.Element("Prix").Value,
                Depart = res.Element("Depart").Value,
                Arriver = res.Element("Arriver").Value
            });
        }

        [HttpGet("ShowReservation.{format}"), FormatFilter]
        public IEnumerable<Reservation> ShowReservation() => repository.Reservations;
    }
}