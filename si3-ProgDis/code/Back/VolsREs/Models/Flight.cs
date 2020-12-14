using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VolsREs.Models
{
    public class Flight
    {
        public int FlightID { get; set; }
        public string DeparaturePlace { get; set; }
        public string ArrivalPlace { get; set; }
        public double Price { get; set; }
        public int TotalSeat { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    
    }
}
