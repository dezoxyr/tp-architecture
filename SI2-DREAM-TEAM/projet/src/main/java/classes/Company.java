package classes;

import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;

import java.util.*;

public class Company {

    private List<Flight> flightlist;
    private List<Client> clientlist;
    private static Company company;

    public static Company getInstance() {
        if (company == null)
            return company = new Company(new LinkedList<Flight>(), new LinkedList<Client>());
        else
            return company;
    }

    private Company(List<Flight> flightlist, List<Client> clientlist) {
        this.flightlist = flightlist;
        this.clientlist = clientlist;
    }

    public void addFlight(Flight flight) {
        flightlist.add(flight);
    }

    public List<Flight> getFlightlist() {
        return company.flightlist;
    }

    public List<Client> getClientlist() {
        return company.clientlist;
    }

    public List<Ticket> getUsersTickets(String user) {
        return findClientByName(user).getTickets();
    }

    public Client findClientByName(String user) {
        for (Client client : clientlist)
            if (client.getName().toLowerCase().equals(user.toLowerCase())) {
                System.out.println("user trouvé " + client.getName() );
                return client;
            }
            return null;
    }

    public Flight findFlightByID(int id){
        for (Flight idf : flightlist)
            if (idf.getId()==id) {
                System.out.println("vol trouvé : " + idf);
                return idf;
            }
            return null;
    }

    public List<Flight> getAvailableFlights() {
        List<Flight> flights = new LinkedList<>();

        for (Flight flight : flightlist)
            if (flight.getDepartureDate().after(new Date()) && flight.getSeats() > 0)
                flights.add(flight);
        return flights;
    }

    public Ticket bookFlight(String user, int flightID) {
        Client c = findClientByName(user);
        Flight f = findFlightByID(flightID);
        System.out.println("new booking : " + c + " " + f);
        return c.addNewTicket(f);
    }

    public void addUser(Client c) {
        clientlist.add(c);
    }

    public Client signIn(String name) {
        Client client = new Client(name);
        addUser(client);
        return client;
    }
}