package api.controller;

import classes.Airport;
import classes.Client;
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
        Date date4 = new GregorianCalendar(2020, Calendar.DECEMBER, 15).getTime();
        Date date5 = new GregorianCalendar(2020, Calendar.DECEMBER, 19).getTime();
        Date date6 = new GregorianCalendar(2021, Calendar.JANUARY, 22).getTime();
        Date date7 = new GregorianCalendar(2021, Calendar.APRIL, 4).getTime();
        Date date8 = new GregorianCalendar(2021, Calendar.MARCH, 20).getTime();
        Date date9 = new GregorianCalendar(2020, Calendar.AUGUST, 3).getTime();
        Date date10 = new GregorianCalendar(2020, Calendar.DECEMBER, 28).getTime();
        Date date11 = new GregorianCalendar(2020, Calendar.SEPTEMBER, 11).getTime();
        Date date12 = new GregorianCalendar(2020, Calendar.JANUARY, 16).getTime();

        company.addFlight(new Flight(516, date1, paris, newyork, 700. ));
        company.addFlight(new Flight(1516, date2, paris, detroit, 845. ));
        company.addFlight(new Flight(216, date3, newyork, detroit, 325. ));
        company.addFlight(new Flight(550, date4, newyork, paris, 425. ));
        company.addFlight(new Flight(0, date5, detroit, paris, 385. ));
        company.addFlight(new Flight(200, date6, detroit,  newyork, 745. ));
        company.addFlight(new Flight(0, date7, newyork, detroit, 155. ));
        company.addFlight(new Flight(125, date8, paris, detroit, 613. ));
        company.addFlight(new Flight(216, date9, newyork, detroit, 871. ));
        company.addFlight(new Flight(310, date10, newyork, paris, 325. ));
        company.addFlight(new Flight(243, date11, detroit, newyork, 556. ));
        company.addFlight(new Flight(19, date12, detroit, paris, 423. ));

        Client c1 = new Client("Sam");
        Client c2 = new Client("Léo");
        Client c3 = new Client("Thibaud");
        Client c4 = new Client("Loïc");

        company.addUser(c1);
        company.addUser(c2);
        company.addUser(c3);
        company.addUser(c4);

        SpringApplication.run(RestServiceApplication.class, args);
    }
}
