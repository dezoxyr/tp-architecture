package com.hexclan.tparchitecture.service;

import com.hexclan.tparchitecture.entity.Airport;
import com.hexclan.tparchitecture.entity.FlightTicket;
import com.hexclan.tparchitecture.entity.User;
import com.hexclan.tparchitecture.exception.apirequestexception.NotFoundException;
import com.hexclan.tparchitecture.repository.AirportRepository;
import com.hexclan.tparchitecture.repository.FlightTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class FlightTicketService {

    @Autowired
    private FlightTicketRepository flightTicketRepository;

    @Autowired
    private AirportRepository airportRepository;

    public List<FlightTicket> findAllAvailableFlights() {
        return flightTicketRepository.findAll().stream().filter(flightTicket -> flightTicket.isAvailable()).collect(Collectors.toList());
    }

    /**
     * @param departAirportCode  code of departure airport
     * @param arrivalAirportCode code of arrival airport
     * @return
     */
    public List<FlightTicket> findAvailableFlightsFor(String departAirportCode, String arrivalAirportCode) {
        Optional<Airport> departAirport = airportRepository.findByCode(departAirportCode);
        Optional<Airport> arrivalAirport = airportRepository.findByCode(arrivalAirportCode);

        if (departAirport.isEmpty()) {
            throw new NotFoundException(String.format("Airport=%s not found", departAirportCode));
        }

        if (arrivalAirport.isEmpty()) {
            throw new NotFoundException(String.format("Airport=%s not found", arrivalAirportCode));
        }

        return flightTicketRepository.findAll()
                .stream()
                .filter(flightTicket -> flightTicket.getDepartureAirport().equals(departAirport.get()) && flightTicket.getArrivalAirport()
                        .equals(arrivalAirport.get())).collect(Collectors.toList());
    }

    public FlightTicket bookFlightTicket(Integer idFlight, User passenger) {
        FlightTicket flightTicket = flightTicketRepository.getOne(idFlight);
        if (flightTicket == null) {
            throw new NotFoundException(String.format("Flight=%s not found", idFlight));
        }

        flightTicket.book(passenger);
        return flightTicket;
    }

    public List<FlightTicket> findReservationsFor(User passenger) {
        return flightTicketRepository.findAll()
                .stream()
                .filter(flightTicket -> flightTicket.getPassenger().equals(passenger))
                .sorted((o1, o2) -> o1.getDateDeparture().compareTo(o2.getDateDeparture()))
                .collect(Collectors.toList());
    }

    public FlightTicket save(FlightTicket flightTicket) {
        return flightTicketRepository.save(flightTicket);
    }
}
