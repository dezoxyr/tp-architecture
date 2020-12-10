package com.esiea.progdistribuee.data;

import java.util.Date;

public class Flight {
    private static int flightCpt = 0;

    private int id;
    private Airport departureAirport;
    private Airport arrivalAirport;
    private double price;
    private Date date;
    private int capacity;

    public Flight(Airport departureAirport, Airport arrivalAirport, double price, Date date, int capacity) {
        this.id = flightCpt++;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.price = price;
        this.date = date;
        this.capacity = capacity;
    }

    public int getId() {
        return id;
    }

    public Airport getArrivalAirport() {
        return arrivalAirport;
    }

    public Airport getDepartureAirport() {
        return departureAirport;
    }

    public Date getDate() {
        return date;
    }

    public double getPrice() {
        return price;
    }

    public int getCapacity() {
        return capacity;
    }

    public boolean isAvailable() {
        return capacity > 0;
    }
}
