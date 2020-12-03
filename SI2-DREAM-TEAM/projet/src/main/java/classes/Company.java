package classes;

import java.util.List;

public class Company {

    private List flightlist;
    private List clientlist;

    public Company(List flightlist, List clientlist) {
        this.flightlist = flightlist;
        this.clientlist = clientlist;
    }

    public List getFlightlist() {
        return flightlist;
    }

    public List getClientlist() {
        return clientlist;
    }
}
