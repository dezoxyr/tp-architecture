package com.esiea.progdistribuee.service;

import com.esiea.progdistribuee.data.User;

import java.util.List;

public interface UserService {

	List<User> getAllUsers();

	User getUser(int id);

	User getUserByUsername(String username);

	void createUser(String username, String password);

	void editUser(int id, String username, String password);

	void deleteUser(User user);

	Boolean userExist(String username, String password);
}
