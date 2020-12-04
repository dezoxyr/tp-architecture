package com.esiea.progdistribuee.data;

public class Airport {
    private static int airportCpt = 0;

    private int id;
    private String airportCode;
    private String airportName;

    public Airport(String airportCode, String airportName) {
        this.id = airportCpt++;
        this.airportCode = airportCode;
        this.airportName = airportName;
    }

}
