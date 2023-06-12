package com.gensphere.ProjectoGensphere.model.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gensphere.ProjectoGensphere.model.entity.User;
import com.gensphere.ProjectoGensphere.model.service.IuserService;
import com.gensphere.ProjectoGensphere.model.dao.IuserDAO;

@Service
public class userServiceImpl implements IuserService {
    @Autowired
    private IuserDAO userDao;
    @Override
    public List<User> getUsers() {
        return userDao.findAll();
    }

    @Override
    public User findUserById(Long id) {
        return userDao.findById(id).orElse(null);
    }

    @Override
    public User findUserByEmail(String userEmail) {
        return userDao.findByUserEmail(userEmail);
    }
    @Override
    public User saveUser(User user) {
        return userDao.save(user);
    }

    @Override
    public void delete(Long id) {
        userDao.deleteById(id);
    }
    @Override
    public void deleteUserByEmail(String userEmail) {
        userDao.deleteByUserEmail(userEmail);
    }
}
