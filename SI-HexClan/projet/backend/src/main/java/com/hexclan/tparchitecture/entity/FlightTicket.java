package com.hexclan.tparchitecture.entity;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * Class representing an air itinerary (journey from one airport to another
 */
@Entity
@Table
public class FlightTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false, unique = true)
    private Integer id;

    @ManyToOne(targetEntity = Airport.class)
    private Airport departureAirport;

    @ManyToOne(targetEntity = Airport.class)
    private Airport arrivalAirport;

    @Column(nullable = false)
    private Double fare;

    @Column(nullable = false)
    private String code;

    @ManyToOne(targetEntity = User.class)
    private User passenger;

    @Column(nullable = false)
    private LocalDate dateDeparture;

    public FlightTicket(Airport departureAirport, Airport arrivalAirport, Double fare, LocalDate dateDeparture) {
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.fare = fare;
        this.code = String.format("%s-%s %f", departureAirport.getCode(), arrivalAirport.getCode(), fare);
        this.dateDeparture = dateDeparture;
    }

    public FlightTicket() {
    }

    public Integer getId() {
        return id;
    }

    public Airport getDepartureAirport() {
        return departureAirport;
    }

    public void setDepartureAirport(Airport departureAirport) {
        this.departureAirport = departureAirport;
    }

    public Airport getArrivalAirport() {
        return arrivalAirport;
    }

    public void setArrivalAirport(Airport arrivalAirport) {
        this.arrivalAirport = arrivalAirport;
    }

    public Double getFare() {
        return fare;
    }

    public void setFare(Double fare) {
        this.fare = fare;
    }

    public String getCode() {
        return code;
    }

    public User getPassenger() {
        return passenger;
    }

    public void setPassenger(User passenger) {
        this.passenger = passenger;
    }

    public void book(User passenger) {
        this.setPassenger(passenger);
    }

    public boolean isAvailable() {
        return this.passenger == null;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocalDate getDateDeparture() {
        return dateDeparture;
    }

    public void setDateDeparture(LocalDate dateDeparture) {
        this.dateDeparture = dateDeparture;
    }
}
