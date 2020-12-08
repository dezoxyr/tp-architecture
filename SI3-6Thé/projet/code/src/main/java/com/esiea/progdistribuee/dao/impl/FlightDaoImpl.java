package com.esiea.progdistribuee.dao.impl;

import com.esiea.progdistribuee.dao.FlightDao;
import com.esiea.progdistribuee.data.Flight;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class FlightDaoImpl implements FlightDao {

    private static List<Flight> flights;

    public FlightDaoImpl() {
        flights = new ArrayList<>();
    }

    @Override
    public List<Flight> allFlights() {
        return flights;
    }

    @Override
    public Flight getFlight(int id) {
        return flights.get(id);
    }

    @Override
    public void createFlight(Flight flight) {
        flights.add(flight);
    }

    @Override
    public void deleteFlight(Flight flight) {
        flights.remove(flight);
    }

    @Override
    public int getLastId() {
        return flights.size();
    }
}
