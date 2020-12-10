package com.esiea.progdistribuee.data;

public class Booking {
    private static int bookingCpt = 0;

    private int id;
    private Flight flight;
    private User user;

    public Booking(Flight flight, User user) {
        this.id = bookingCpt++;
        this.flight = flight;
        this.user = user;
    }

    public Flight getFlight() {
        return flight;
    }
}
