using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VolsREs.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string login { get; set; }
        public ICollection<Reservation> Reservations { get; set; }
    }
}
