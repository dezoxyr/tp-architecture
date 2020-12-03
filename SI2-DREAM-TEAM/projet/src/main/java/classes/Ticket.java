package classes;

public class Ticket {

    private Double price;
    private Flight flight;

    public Ticket(Double price, Flight flight) {
        this.price = price;
        this.flight = flight;
    }

    public Double getPrice() {
        return price;
    }

    public Flight getFlight() {
        return flight;
    }

    @Override
    public String toString() {
        return flight.toString()+' '+price;
    }
}
