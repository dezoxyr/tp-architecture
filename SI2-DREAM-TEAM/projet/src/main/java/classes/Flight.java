package classes;

import java.util.Date;

public class Flight {

    private int seats;
    private Double price;
    private Date departureDate;
    private Airport departure;
    private Airport destination;

    public Flight(int seats, Date departureDate, Airport departure, Airport destination, Double price) {
        this.seats = seats;
        this.departureDate = departureDate;
        this.departure = departure;
        this.destination = destination;
        this.price = price;
    }

    public int getSeats() {
        return seats;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public Airport getDeparture() {
        return departure;
    }

    public Airport getDestination() {
        return destination;
    }

    public Double getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return  departure.getCode()+'-'+ destination.getCode();
    }
}
