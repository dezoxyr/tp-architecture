package classes;

public class Ticket {


    private Flight flight;

    public Ticket(Flight flight) {
        this.flight = flight;
    }


    public Flight getFlight() {
        return flight;
    }

    @Override
    public String toString() {
        return flight.toString()+' '+flight.getPrice();
    }
}
