package com.esiea.progdistribuee.service;

import com.esiea.progdistribuee.data.Airport;

import java.util.List;

public interface AirportService {

    List<Airport> getAllAirports();

    Airport getAirport(int id);

    void createAirport(String airportCode, String airportName);

    void deleteAirport(Airport airport);
}
