package com.esiea.progdistribuee.dao.impl;

import com.esiea.progdistribuee.dao.AirportDao;
import com.esiea.progdistribuee.data.Airport;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class AirportDaoImpl implements AirportDao {

    private static List<Airport> airports;

    public AirportDaoImpl() {
        airports = new ArrayList<>();
    }

    @Override
    public List<Airport> allAirports() {
        return airports;
    }

    @Override
    public Airport getAirport(int id) {
        return airports.get(id);
    }

    @Override
    public void createAirport(Airport airport) {
        airports.add(airport);
    }

    @Override
    public void deleteAirport(Airport airport) {
        airports.remove(airport);
    }

    @Override
    public int getLastId() {
        return airports.size();
    }
}
