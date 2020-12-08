package com.esiea.progdistribuee.dao.impl;

import com.esiea.progdistribuee.dao.UserDao;
import com.esiea.progdistribuee.data.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

	private static List<User> users;

	public UserDaoImpl() {
		users = new ArrayList<>();
	}

	@Override
	public List<User> allUsers() {
		return users;
	}

	@Override
	public User getUser(int id) {
		return users.get(id);
	}

	@Override
	public User getUserbyUsername(String username) {
		for (User user: users) {
			if(user.getUsername() == username) {
				return user;
			}
		}
		return null;
	}

	@Override
	public void createUser(User user) {
		users.add(user);
	}

	@Override
	public void deleteUser(User user) {
		users.remove(user);
	}

	@Override
	public int getLastId() {
		return users.size();
	}

	@Override
	public Boolean userExists(String username, String password) {
		for (User user: users) {
			if(user.getUsername() == username && user.getPassword() == password) {
				return true;
			}
		}
		return false;
	}
}
