package com.esiea.progdistribuee.dao.impl;

import com.esiea.progdistribuee.dao.AirportDao;
import com.esiea.progdistribuee.dao.FlightDao;
import com.esiea.progdistribuee.data.Airport;
import com.esiea.progdistribuee.data.Flight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public class FlightDaoImpl implements FlightDao {

    private static List<Flight> flights;

    public FlightDaoImpl() {
        flights = new ArrayList<>();
        Airport jfkAirport = new Airport("JFK", "New York");
        Airport cdgAirport = new Airport("CDG", "CDG Paris");
        Airport dtwAirport = new Airport("DTW", "Detroit");
        createFlight(new Flight(jfkAirport, cdgAirport, 450, new Date(), 120));
        createFlight(new Flight(cdgAirport, dtwAirport, 678, new Date(), 226));
        createFlight(new Flight(dtwAirport, jfkAirport, 462, new Date(), 124));
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
