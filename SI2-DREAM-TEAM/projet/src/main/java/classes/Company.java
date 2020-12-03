package classes;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Company {

    private List<Flight> flightlist;
    private List<Client> clientlist;
    private static Company company;

    public static Company getInstance(){
        if (company == null)
            return company = new Company(new LinkedList<Flight>(), new LinkedList<Client>());
        else
            return company;
    }

    private Company(List<Flight> flightlist, List<Client> clientlist) {
        this.flightlist = flightlist;
        this.clientlist = clientlist;
    }

    public void addFlight(Flight flight){
        flightlist.add(flight);
    }

    public List<Flight> getFlightlist() {
        return company.flightlist;
    }

    public List<Client> getClientlist() {
        return company.clientlist;
    }
}
