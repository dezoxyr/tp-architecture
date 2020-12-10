package api.controller;

import classes.Client;
import classes.Company;
import classes.Flight;
import classes.Ticket;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

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
        return company.getAvailableFlights();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/tickets")
    public List<Ticket> getReservedFlights(@RequestParam("name") String user) {
        return company.getUsersTickets(user);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/reservation")
    public ResponseEntity<Ticket> getReservation(@RequestBody Map<String, String> json) {
        String user = json.get("name");
        int flightID = Integer.parseInt(json.get("id"));
        return ResponseEntity.status(HttpStatus.CREATED).body(company.bookFlight(user,flightID));
        //return ResponseEntity.status(201).body("{ name: " + json.get("name") + ", id: " + json.get("id") + "}");
    }

}
