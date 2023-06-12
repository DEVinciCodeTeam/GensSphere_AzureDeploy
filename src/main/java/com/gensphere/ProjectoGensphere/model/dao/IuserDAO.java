package com.gensphere.ProjectoGensphere.model.dao;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.gensphere.ProjectoGensphere.model.entity.User;

@Repository
public interface IuserDAO extends JpaRepository<User,Long> {
    User findByUserEmail(String userEmail);

    void deleteByUserEmail(String userEmail);
}
