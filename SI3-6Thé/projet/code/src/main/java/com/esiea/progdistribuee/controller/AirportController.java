package com.esiea.progdistribuee.controller;

import com.esiea.progdistribuee.data.Airport;
import com.esiea.progdistribuee.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/airport")
public class AirportController {

    @Autowired
    private AirportService service;

    @GetMapping("/")
    public List<Airport> allAirports() {
        return service.getAllAirports();
    }

    @GetMapping("/{id}")
    public Airport getAirport(@PathVariable int id) {
        return service.getAirport(id);
    }

    @PostMapping("/new")
    public void create(@RequestParam String airportCode, @RequestParam String airportName) {
        service.createAirport(airportCode, airportName);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam int id) {
        service.deleteAirport(service.getAirport(id));
    }
}
