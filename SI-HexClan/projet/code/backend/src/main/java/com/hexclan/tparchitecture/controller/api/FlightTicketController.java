package com.hexclan.tparchitecture.controller.api;

import com.hexclan.tparchitecture.entity.Airport;
import com.hexclan.tparchitecture.entity.FlightTicket;
import com.hexclan.tparchitecture.entity.User;
import com.hexclan.tparchitecture.exception.apirequestexception.BadRequestException;
import com.hexclan.tparchitecture.repository.AirportRepository;
import com.hexclan.tparchitecture.service.FlightTicketService;
import com.hexclan.tparchitecture.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/flight-ticket")
public class FlightTicketController {

    @Autowired
    private FlightTicketService flightTicketService;

    @Autowired
    private UserService userService;

    @Autowired
    private AirportRepository airportRepository;

    @PostConstruct
    public void init() {
        Airport airport1 = new Airport("New York", "JFK");
        Airport airport2 = new Airport("Charles de Gaulle", "CDG");
        Airport airport3 = new Airport("Detroit", "DTW");

        airportRepository.saveAndFlush(airport1);
        airportRepository.saveAndFlush(airport2);
        airportRepository.saveAndFlush(airport3);

        flightTicketService.save(new FlightTicket(airport1, airport2, 300.0, LocalDate.now().plusMonths(1)));
        flightTicketService.save(new FlightTicket(airport2, airport3, 300.0, LocalDate.now().plusDays(1)));
        flightTicketService.save(new FlightTicket(airport3, airport2, 300.0, LocalDate.now().plusWeeks(2)));
        flightTicketService.save(new FlightTicket(airport1, airport2, 300.0, LocalDate.now().plusMonths(1)));
        flightTicketService.save(new FlightTicket(airport2, airport3, 300.0, LocalDate.now().plusDays(1)));
        flightTicketService.save(new FlightTicket(airport3, airport2, 300.0, LocalDate.now().plusWeeks(2)));
        flightTicketService.save(new FlightTicket(airport1, airport2, 300.0, LocalDate.now().plusMonths(1)));
        flightTicketService.save(new FlightTicket(airport2, airport3, 300.0, LocalDate.now().plusDays(1)));
        flightTicketService.save(new FlightTicket(airport3, airport2, 300.0, LocalDate.now().plusWeeks(2)));
        flightTicketService.save(new FlightTicket(airport2, airport3, 300.0, LocalDate.now().plusDays(1)));
        flightTicketService.save(new FlightTicket(airport3, airport2, 300.0, LocalDate.now().plusWeeks(2)));
        flightTicketService.save(new FlightTicket(airport1, airport2, 300.0, LocalDate.now().plusMonths(1)));
        flightTicketService.save(new FlightTicket(airport2, airport3, 300.0, LocalDate.now().plusDays(1)));
        flightTicketService.save(new FlightTicket(airport3, airport2, 300.0, LocalDate.now().plusWeeks(2)));
        flightTicketService.save(new FlightTicket(airport1, airport2, 300.0, LocalDate.now().plusMonths(1)));
        flightTicketService.save(new FlightTicket(airport2, airport3, 300.0, LocalDate.now().plusDays(1)));
        flightTicketService.save(new FlightTicket(airport3, airport2, 300.0, LocalDate.now().plusWeeks(2)));
        flightTicketService.save(new FlightTicket(airport1, airport2, 300.0, LocalDate.now().plusMonths(1)));
        flightTicketService.save(new FlightTicket(airport2, airport3, 300.0, LocalDate.now().plusDays(1)));
        flightTicketService.save(new FlightTicket(airport3, airport2, 300.0, LocalDate.now().plusWeeks(2)));
        flightTicketService.save(new FlightTicket(airport1, airport2, 300.0, LocalDate.now().plusMonths(1)));
        flightTicketService.save(new FlightTicket(airport2, airport3, 300.0, LocalDate.now().plusDays(1)));
        flightTicketService.save(new FlightTicket(airport3, airport2, 300.0, LocalDate.now().plusWeeks(2)));
        flightTicketService.save(new FlightTicket(airport2, airport3, 300.0, LocalDate.now().plusDays(1)));
        flightTicketService.save(new FlightTicket(airport3, airport2, 300.0, LocalDate.now().plusWeeks(2)));
        flightTicketService.save(new FlightTicket(airport1, airport2, 300.0, LocalDate.now().plusMonths(1)));
        flightTicketService.save(new FlightTicket(airport2, airport3, 300.0, LocalDate.now().plusDays(1)));
        flightTicketService.save(new FlightTicket(airport3, airport2, 300.0, LocalDate.now().plusWeeks(2)));
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllAvailableFlights(
            @RequestParam(name = "depart_airport", required = false) String departAirport,
            @RequestParam(name = "arrival_airport", required = false) String arrivalAirport,
            @RequestParam(name = "date_depart", required = false) String dateDepart) {

        if (departAirport == null || arrivalAirport == null) {
            return ResponseEntity.ok(flightTicketService.findAllAvailableFlights());
        }

        List<FlightTicket> flights = flightTicketService.findAvailableFlightsFor(departAirport.toUpperCase(), arrivalAirport.toUpperCase());

        if (dateDepart != null) {
            try {
                flights = flightTicketService.filterByDateDepart(flights, LocalDate.parse(dateDepart));
            } catch (Exception e) {
                throw new BadRequestException("Date departure is invalid (YYYY-MM-DD)");
            }
        }

        return ResponseEntity.ok(flights);
    }

    @PatchMapping("/{idFlight}/book")
    public ResponseEntity<?> bookFlightTicket(@PathVariable(name = "idFlight") Integer idFlight, HttpServletRequest httpRequest) {
        try {
            String username = (String) httpRequest.getAttribute("username");
            User passenger = userService.findByUsername(username);

            return ResponseEntity.ok(flightTicketService.bookFlightTicket(idFlight, passenger));
        } catch (NumberFormatException e) {
            throw new BadRequestException("Invalid id");
        }
    }

    @PatchMapping("/{idFlight}/cancel")
    public ResponseEntity<?> cancelFlightTicket(@PathVariable(name = "idFlight") Integer idFlight, HttpServletRequest httpRequest) {
        try {
            String username = (String) httpRequest.getAttribute("username");
            User passenger = userService.findByUsername(username);

            return ResponseEntity.ok(flightTicketService.cancelFlightTicket(idFlight, passenger));
        } catch (NumberFormatException e) {
            throw new BadRequestException("Invalid id");
        }
    }

    @GetMapping("/my-reservations")
    public ResponseEntity<?> getMyReservations(HttpServletRequest httpRequest) {
        String username = (String) httpRequest.getAttribute("username");
        User passenger = userService.findByUsername(username);
        return ResponseEntity.ok(flightTicketService.findReservationsFor(passenger));
    }
}
