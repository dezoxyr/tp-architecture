package com.esiea.progdistribuee.service.impl;

import java.util.List;

import com.esiea.progdistribuee.dao.UserDao;
import com.esiea.progdistribuee.data.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esiea.progdistribuee.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao dao;

	@Override
	public List<User> getAllUsers() {
		return dao.allUsers();
	}

	@Override
	public User getUser(int id) {
		return dao.getUser(id);
	}

	@Override
	public User getUserByUsername(String username) {
		return dao.getUserbyUsername(username);
	}

	@Override
	public void createUser(String username, String password) {
		User newUser = new User(username, password);
		dao.createUser(newUser);
	}

	@Override
	public void editUser(int id, String username, String password) {
		User user = getUser(id);
		if(username != null)
			user.setUsername(username);
		if(password != null)
			user.setPassword(password);
	}

	@Override
	public void deleteUser(User user) {
		dao.deleteUser(user);
	}

	@Override
	public Boolean userExist(String username, String password) {
		return dao.userExists(username, password);
	}
}
