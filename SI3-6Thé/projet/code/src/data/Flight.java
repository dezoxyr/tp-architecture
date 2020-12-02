package data;

public class Flight {

    private int id;
    private Airport departureAirport;
    private Airport arrivalAirport;
    private double price;

    public Flight(int id, Airport departureAirport, Airport arrivalAirport, double price) {
        this.id = id;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.price = price;
    }
}
