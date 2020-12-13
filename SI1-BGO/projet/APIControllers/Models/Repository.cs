using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APIControllers.Models
{
    public class Repository: IRepository
    {
        private Dictionary<int, Reservation> items;
       
        public Repository()
        {
            items = new Dictionary<int, Reservation>();
            new List<Reservation> {
              /*  new Reservation {Id=1, Prix = "600", Depart = "JFK", Arriver="CDG" },
                new Reservation {Id=2, Prix = "200", Depart = "JFK", Arriver="DTW" },
                new Reservation {Id=3, Prix = "700", Depart = "CDG", Arriver="DTW" },
                new Reservation {Id=4, Prix = "600", Depart = "CDG", Arriver="JFK" },
                new Reservation {Id=5, Prix = "200", Depart = "DTW", Arriver="JFK" },
                new Reservation {Id=6, Prix = "700", Depart = "DTW", Arriver="CDG" }*/
                }.ForEach(r => AddReservation(r));
        }

        public Reservation this[int id] => items.ContainsKey(id) ? items[id] : null;
        
        public IEnumerable<Reservation> Reservations => items.Values;
        
        public Reservation AddReservation(Reservation reservation)
        {
            if (reservation.Id == 0)
            {
                int key = items.Count;
                while (items.ContainsKey(key)) { key++; };
                reservation.Id = key;
            }
            items[reservation.Id] = reservation;
            return reservation;
        }
        
        public void DeleteReservation(int id) => items.Remove(id);
        
        public Reservation UpdateReservation(Reservation reservation) => AddReservation(reservation);
    }
}
