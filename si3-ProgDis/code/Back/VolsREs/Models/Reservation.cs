using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VolsREs.Models
{
    public class Reservation
    {
        public int ReservationID { get; set; }
        public Flight Flight { get; set; }
        public int FlightID { get; set; }
        public User User { get; set; }

        public int UserID { get; set; }
  
    }
}
