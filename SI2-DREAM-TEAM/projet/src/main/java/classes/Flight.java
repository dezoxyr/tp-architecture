package classes;

import java.util.Date;

public class Flight {

    private int seats;
    private Date departure;
    private Airport depart;
    private Airport arrive;

    public Flight(int seats, Date departure, Airport depart, Airport arrive) {
        this.seats = seats;
        this.departure = departure;
        this.depart = depart;
        this.arrive = arrive;
    }

    public int getSeats() {
        return seats;
    }

    public Date getDeparture() {
        return departure;
    }

    public Airport getDepart() {
        return depart;
    }

    public Airport getArrive() {
        return arrive;
    }

    @Override
    public String toString() {
        return  depart.getCode()+'-'+arrive.getCode();
    }
}
