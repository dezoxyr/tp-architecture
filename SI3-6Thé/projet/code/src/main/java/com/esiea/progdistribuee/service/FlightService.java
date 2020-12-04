package com.esiea.progdistribuee.service;

import com.esiea.progdistribuee.data.Airport;
import com.esiea.progdistribuee.data.Flight;
import com.esiea.progdistribuee.data.User;

import java.util.Date;
import java.util.List;

public interface FlightService {

    List<Flight> getAllFlights();

    Flight getFlight(int id);

    void createFlight(Airport departureAirport, Airport arrivalAirport, double price, Date date, int capacity);

    void deleteFlight(Flight flight);

    void book(Flight flight, User user);
}
