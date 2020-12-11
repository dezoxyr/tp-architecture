package com.esiea.progdistribuee.dao;

import com.esiea.progdistribuee.data.Booking;
import com.esiea.progdistribuee.data.Flight;

import java.util.List;

public interface FlightDao {

    List<Flight> allFlights();

    Flight getFlight(int id);

    void createFlight(Flight flight);

    void deleteFlight(Flight flight);

    int getLastId();

    List<Booking> getUserBookings(int userId);
}
