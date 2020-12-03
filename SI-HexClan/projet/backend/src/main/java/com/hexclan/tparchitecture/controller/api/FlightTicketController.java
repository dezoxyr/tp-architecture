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

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/flight-ticket")
public class FlightTicketController {

    @Autowired
    private FlightTicketService flightTicketService;

    @Autowired
    private UserService userService;

    @Autowired
    private AirportRepository airportRepository;

    @GetMapping("/")
    public ResponseEntity<?> getAllAvailableFlights(
            @RequestParam(name = "depart_airport", required = false) String departAirport,
            @RequestParam(name = "arrival_airport", required = false) String arrivalAirport) {

        if (departAirport == null || arrivalAirport == null) {
            return ResponseEntity.ok(flightTicketService.findAllAvailableFlights());
        }

        return ResponseEntity.ok(flightTicketService.findAvailableFlightsFor(departAirport, arrivalAirport));
    }

    @PostMapping("/{idFlight}")
    public ResponseEntity<?> bookFlightTicket(@PathVariable(name = "idFlight") String idFlight, HttpServletRequest httpRequest) {
        try {
            Integer idFlightInt = Integer.parseInt(idFlight);

            String username = (String) httpRequest.getAttribute("username");
            User passenger = userService.findByUsername(username);

            return ResponseEntity.ok(flightTicketService.bookFlightTicket(idFlightInt, passenger));
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

    @PostMapping("/load-fake-flights")
    public ResponseEntity<?> loadFakeFlights(){
//        airportRepository.saveAndFlush(new Airport("Charles de Gaulle", "CDG"));
//        airportRepository.saveAndFlush(new Airport("New York", "JFK"));

        flightTicketService.save(new FlightTicket(airportRepository.getOne(2), airportRepository.getOne(3), 300.0, LocalDate.now()));
        flightTicketService.save(new FlightTicket(airportRepository.getOne(3), airportRepository.getOne(2), 300.0, LocalDate.now()));
        flightTicketService.save(new FlightTicket(airportRepository.getOne(3), airportRepository.getOne(2), 300.0, LocalDate.now()));

        return ResponseEntity.ok().build();
    }
}
