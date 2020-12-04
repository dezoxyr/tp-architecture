package api.controller;

import classes.Company;
import classes.Flight;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RestController
public class FlightController {
    Company company = Company.getInstance();

    /**
     * Liste des vols
     *
     * @return
     */
    @GetMapping("/flightslist")
    public List<Flight> getAllFlights() {
        return company.getFlightlist();
    }

    /**
     * Liste des vols disponibles
     *
     * @return
     */
    @GetMapping("/available_flights")
    public List<Flight> getAvailableFlights() {
        LinkedList<Flight> flights = new LinkedList<>();

        for (Flight flight : company.getFlightlist())
            if (flight.getDepartureDate().after(new Date()) && flight.getSeats() > 0)
                flights.add(flight);

        return flights;
    }

    /*@RequestMapping(method = RequestMethod.POST, value="/reservation")
    public String getReservation() {
        return "coucou";
    }*/

   /* @GetMapping("/reservation")
    public String getReservation() {
        return "coucou";
    }*/

}
