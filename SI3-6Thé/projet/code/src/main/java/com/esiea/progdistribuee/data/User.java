package com.esiea.progdistribuee.data;

import java.util.ArrayList;
import java.util.List;

public class User {
	private static int userCpt = 0;

	private int id;
	private String username;
	private String password;
	private List<Booking> bookings;

    public User(String username, String password) {
    	this.id = userCpt++;
		this.username = username;
		this.password = password;
		bookings = new ArrayList<>();
	}

	public int getId() {
		return id;
	}

	public String getUsername() {
    	return username;
	}

	public String getPassword() {
		return password;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void addBooking(Booking booking) {
		bookings.add(booking);
	}

}
