package com.esiea.progdistribuee.data;

public class Booking {
    private static int bookingCpt = 0;

    private int id;
    private Flight flight;
    private User user;
    private int nbPersons;

    public Booking(Flight flight, User user, int nbPersons) {
        this.id = bookingCpt++;
        this.flight = flight;
        this.user = user;
        this.nbPersons = nbPersons;
    }

    public int getNbPersons() {
        return nbPersons;
    }

    public Flight getFlight() {
        return flight;
    }
}
