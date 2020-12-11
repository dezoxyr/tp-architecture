package com.esiea.progdistribuee.controller;

import com.esiea.progdistribuee.data.Airport;
import com.esiea.progdistribuee.data.Booking;
import com.esiea.progdistribuee.data.Flight;
import com.esiea.progdistribuee.service.FlightService;
import com.esiea.progdistribuee.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/flight")
public class FlightController {

    @Autowired
    private FlightService service;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public List<Flight> allFlights() {
        return service.getAllFlights();
    }

    @GetMapping("/bookings")
    public List<Booking> userBookings(@RequestParam int userId) {
        return service.getUserBookings(userId);
    }

    @GetMapping("/{id}")
    public Flight getFlight(@PathVariable int id) {
        return service.getFlight(id);
    }

    @PostMapping("/new")
    public void create(@RequestParam Airport departureAirport, @RequestParam Airport arrivalAirport, @RequestParam double price, @RequestParam java.util.Date date, @RequestParam int capacity) {
        service.createFlight(departureAirport, arrivalAirport, price, date, capacity);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam int id) {
        service.deleteFlight(service.getFlight(id));
    }

    @PostMapping("/book")
    public void bookFlight(@RequestParam int flightId, @RequestParam String userId, @RequestParam String nbPersons) throws Exception {
        if (!service.getFlight(flightId).isAvailableFor(Integer.parseInt(nbPersons)))
            throw new Exception("Plus assez de places disponibles");
        if (service.alreadyBook(userService.getUser(Integer.parseInt(userId)), flightId))
            throw new Exception("Vol déjà réservé");
        service.book(service.getFlight(flightId), userService.getUser(Integer.parseInt(userId)), Integer.parseInt(nbPersons));
    }

    @PostMapping("/cancel")
    public void cancelFlight(@RequestParam int flightId, @RequestParam String userId) {
        service.cancelBooking(service.getFlight(flightId), userService.getUser(Integer.parseInt(userId)));
    }
}
