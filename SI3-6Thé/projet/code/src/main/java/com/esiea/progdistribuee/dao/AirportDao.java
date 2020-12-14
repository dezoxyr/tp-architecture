package com.esiea.progdistribuee.dao;

import com.esiea.progdistribuee.data.Airport;

import java.util.List;

public interface AirportDao {

    List<Airport> allAirports();

    Airport getAirport(int id);

    void createAirport(Airport airport);

    void deleteAirport(Airport airport);

    int getLastId();
}
