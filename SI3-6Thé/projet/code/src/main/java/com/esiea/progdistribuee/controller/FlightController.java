package com.esiea.progdistribuee.controller;

import com.esiea.progdistribuee.data.Airport;
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
    public List<Flight> allFlights(@RequestParam(required = false, defaultValue = "-1") int userId) {
        if(userId < 0) {
            return service.getAllFlights();
        }
        return service.getUserFlights(userId);
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
    public void bookFlight(@RequestParam int flightId, @RequestParam String userId) {
        service.book(service.getFlight(flightId), userService.getUser(Integer.parseInt(userId)));
    }

    @PostMapping("/cancel")
    public void cancelFlight(@RequestParam int flightId, @RequestParam String userId) {
        service.cancelBooking(service.getFlight(flightId), userService.getUser(Integer.parseInt(userId)));
    }
}
