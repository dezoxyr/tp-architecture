package data;

import java.util.ArrayList;
import java.util.List;

public class User {

    private int id;
    private String name;
    private List<Flight> bookedFlights;

    public User(int id, String name) {
        this.id = id;
        this.name = name;
        bookedFlights = new ArrayList<>();
    }
}
