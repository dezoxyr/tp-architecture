package com.esiea.progdistribuee.service.impl;

import com.esiea.progdistribuee.dao.FlightDao;
import com.esiea.progdistribuee.data.Airport;
import com.esiea.progdistribuee.data.Booking;
import com.esiea.progdistribuee.data.Flight;
import com.esiea.progdistribuee.data.User;
import com.esiea.progdistribuee.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightDao dao;

    @Override
    public List<Flight> getAllFlights() {
        return dao.allFlights();
    }

    @Override
    public Flight getFlight(int id) {
        return dao.getFlight(id);
    }

    @Override
    public void createFlight(Airport departureAirport, Airport arrivalAirport, double price, Date date, int capacity) {
        Flight flight = new Flight(departureAirport, arrivalAirport, price, date, capacity);
        dao.createFlight(flight);
    }

    @Override
    public void deleteFlight(Flight flight) {
        dao.deleteFlight(flight);
    }

    @Override
    public void book(Flight flight, User user) {
        Booking booking = new Booking(flight, user);
        user.addBooking(booking);
    }

    @Override
    public List<Flight> getUserFlights(int userId) {
        return dao.getUserFlights(userId);
    }

    @Override
    public void cancelBooking(Flight flight, User user) {
        List<Booking> bookings = user.getBookings();
        for(Booking booking: bookings) {
            if(booking.getFlight().getId() == flight.getId()) {
                user.removeBooking(booking);
            }
        }
    }

}
