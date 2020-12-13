using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIConsume.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string Prix { get; set; }
        public string Depart { get; set; }
        public string Arriver { get; set; }
    }
}