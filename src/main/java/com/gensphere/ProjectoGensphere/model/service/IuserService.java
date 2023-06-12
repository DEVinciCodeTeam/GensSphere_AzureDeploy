package com.gensphere.ProjectoGensphere.model.service;

import java.util.List;
import com.gensphere.ProjectoGensphere.model.entity.User;

public interface IuserService {
    List<User>getUsers();
    User findUserById(Long id);
    User findUserByEmail(String userEmail);
    User saveUser(User user);
    void delete(Long id);
    void deleteUserByEmail(String userEmail);

}
