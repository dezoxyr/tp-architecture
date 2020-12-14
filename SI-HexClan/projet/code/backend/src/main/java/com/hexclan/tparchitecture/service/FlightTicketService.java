package com.hexclan.tparchitecture.service;

import com.hexclan.tparchitecture.entity.Airport;
import com.hexclan.tparchitecture.entity.FlightTicket;
import com.hexclan.tparchitecture.entity.User;
import com.hexclan.tparchitecture.exception.apirequestexception.BadRequestException;
import com.hexclan.tparchitecture.exception.apirequestexception.ForbiddenException;
import com.hexclan.tparchitecture.exception.apirequestexception.NotFoundException;
import com.hexclan.tparchitecture.repository.AirportRepository;
import com.hexclan.tparchitecture.repository.FlightTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
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
        return flightTicketRepository.findAll()
                .stream()
                .filter(flightTicket -> flightTicket.isAvailable())
                .sorted((o1, o2) -> o1.getId().compareTo(o2.getId()))
                .collect(Collectors.toList());
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
                .filter(flightTicket -> flightTicket.isAvailable())
                .filter(flightTicket -> flightTicket.getDepartureAirport().equals(departAirport.get()) && flightTicket.getArrivalAirport()
                        .equals(arrivalAirport.get())).collect(Collectors.toList());
    }

    public FlightTicket bookFlightTicket(Integer idFlight, User passenger) {
        Optional<FlightTicket> flightTicketOptional = flightTicketRepository.findById(idFlight);
        if (flightTicketOptional.isEmpty()) {
            throw new NotFoundException(String.format("Flight=%s not found", idFlight));
        }

        FlightTicket ft = flightTicketOptional.get();

        if (!ft.isAvailable()) {
            throw new ForbiddenException(String.format("Flight=%s already booked", idFlight));
        }

        ft.book(passenger);
        return ft;
    }

    public FlightTicket cancelFlightTicket(Integer idFlight, User passenger){
        Optional<FlightTicket> flightTicketOptional = flightTicketRepository.findById(idFlight);
        if (flightTicketOptional.isEmpty()) {
            throw new NotFoundException(String.format("Flight=%s not found", idFlight));
        }

        FlightTicket ft = flightTicketOptional.get();

        if (ft.isAvailable()){
            throw new BadRequestException(String.format("Flight=%s was not booked", idFlight));
        }

        if (!ft.getPassenger().equals(passenger)){
            throw new ForbiddenException(String.format("User=%s did not book this flight", passenger.getUsername()));
        }

        ft.cancelReservation();
        return ft;
    }

    public List<FlightTicket> findReservationsFor(User passenger) {
        return flightTicketRepository.findAll()
                .stream()
                .filter(flightTicket -> !flightTicket.isAvailable() && flightTicket.getPassenger().equals(passenger))
                .sorted((o1, o2) -> o1.getDateDeparture().compareTo(o2.getDateDeparture()))
                .collect(Collectors.toList());
    }

    public List<FlightTicket> filterByDateDepart(List<FlightTicket> flights, LocalDate dateDepart) {
        return flights.stream().filter(flightTicket -> flightTicket.getDateDeparture().isEqual(dateDepart) || flightTicket.getDateDeparture().isAfter(dateDepart)).collect(Collectors.toList());
    }

    public FlightTicket save(FlightTicket flightTicket) {
        return flightTicketRepository.save(flightTicket);
    }
}
