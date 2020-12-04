package com.esiea.progdistribuee.dao;

import java.util.List;

import com.esiea.progdistribuee.data.User;

public interface UserDao {

	List<User> allUsers();

	User getUser(int id);

	User getUserbyUsername(String username);

	void createUser(User user);

	void deleteUser(User user);

	int getLastId();

	Boolean userExists(String username, String password);
}
