package api.controller;

import classes.Airport;
import classes.Company;
import classes.Flight;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@SpringBootApplication
public class RestServiceApplication {

    public static void main(String[] args) {

        Company company = Company.getInstance();
        Airport paris = new Airport("CDG Paris", "CDG");
        Airport newyork = new Airport("New-York", "JFK");
        Airport detroit = new Airport("Détroit", "DTW");

        Date date1 = new GregorianCalendar(2020, Calendar.FEBRUARY, 11).getTime();
        Date date2 = new GregorianCalendar(2020, Calendar.JUNE, 14).getTime();
        Date date3 = new GregorianCalendar(2020, Calendar.DECEMBER, 28).getTime();
        Date date4 = new GregorianCalendar(2020, Calendar.DECEMBER, 28).getTime();

        company.addFlight(new Flight(516, date1, paris, newyork, 700. ));
        company.addFlight(new Flight(1516, date2, paris, detroit, 845. ));
        company.addFlight(new Flight(216, date3, newyork, detroit, 325. ));
        company.addFlight(new Flight(0, date4, newyork, detroit, 325. ));

        SpringApplication.run(RestServiceApplication.class, args);
    }
}
