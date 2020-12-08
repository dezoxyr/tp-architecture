package com.esiea.progdistribuee.service.impl;

import com.esiea.progdistribuee.dao.AirportDao;
import com.esiea.progdistribuee.data.Airport;
import com.esiea.progdistribuee.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirportServiceImpl implements AirportService {

    @Autowired
    private AirportDao dao;

    @Override
    public List<Airport> getAllAirports() {
        return dao.allAirports();
    }

    @Override
    public Airport getAirport(int id) {
        return dao.getAirport(id);
    }

    @Override
    public void createAirport(String airportCode, String airportName) {
        Airport airport = new Airport(airportCode, airportName);
        dao.createAirport(airport);
    }

    @Override
    public void deleteAirport(Airport airport) {
        dao.deleteAirport(airport);
    }

}
