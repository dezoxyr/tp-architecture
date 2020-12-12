package classes;

import java.util.LinkedList;
import java.util.List;

public class Client {

    private String name;
    private List<Ticket> ticketlist;

    public Client(String name) {
        this.name = name;
        this.ticketlist = new LinkedList<>();
    }

    public Client(String name, List<Ticket> ticketlist){
        this.name = name;
        this.ticketlist = ticketlist;
    }

    public Ticket addNewTicket(Flight f){
        Ticket ticket = new Ticket(f);
        ticketlist.add(ticket);
        return ticket;
    }


    public String getName() {
        return name;
    }

    public List<Ticket> getTickets() {
        return ticketlist;
    }
}
