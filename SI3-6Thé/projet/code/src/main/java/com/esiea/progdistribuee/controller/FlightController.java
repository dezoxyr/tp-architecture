package com.esiea.progdistribuee.controller;

import com.esiea.progdistribuee.data.Airport;
import com.esiea.progdistribuee.data.Flight;
import com.esiea.progdistribuee.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/flight")
public class FlightController {

    @Autowired
    private FlightService service;

    @GetMapping("/")
    public List<Flight> allFlights() {
        return service.getAllFlights();
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
}
