package classes;

import java.util.List;

public class Client {

    private String name;
    private List ticketlist;

    public Client(String name, List ticketlist) {
        this.name = name;
        this.ticketlist = ticketlist;
    }

    public String getName() {
        return name;
    }
}
