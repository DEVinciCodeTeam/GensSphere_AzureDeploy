package com.gensphere.ProjectoGensphere.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gensphere.ProjectoGensphere.model.entity.User;
import com.gensphere.ProjectoGensphere.model.service.IuserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"*"})

public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IuserService userService;

    @GetMapping("/list")
    public List<User>index(){
        return userService.getUsers();
    }

    //Buscar usuario por Email
    @GetMapping("/email/{userEmail}")
    public ResponseEntity<?> show(@PathVariable String userEmail){
        User user = null;
        Map<String,Object> response = new HashMap<>();

        try {
            user = userService.findUserByEmail(userEmail);

        }catch(DataAccessException e) {
            response.put("mensaje", "Error de acceso a la base de datos");
            response.put("error",e.getMessage().concat(" ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);

        }
        if(user == null) {
            response.put("mensaje", "El usuario no se encuentra en el sistema");
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User>(user,HttpStatus.OK);

    }

    //Guardar usuario
    @PostMapping("/save")
    public ResponseEntity<?>create(@RequestBody User user) {
        logger.info("Contenido del JSON recibido: {}", user);
        User usuarioNuevo = null;
        Map<String,Object> response = new HashMap<>();
        try {
            usuarioNuevo = userService.saveUser(user);

        }catch (DataAccessException e) {
            response.put("mensaje", "Error al insertar el usuario en la base de datos");
            response.put("error",e.getMessage().concat(" ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "Usuario creado con éxito");
        response.put("usuario", usuarioNuevo);

        return new ResponseEntity<User>(user,HttpStatus.CREATED);
    }

    //Actualizar usuario por email
    @PutMapping("/update/{userEmail}")

    public ResponseEntity<?> update(@RequestBody User user,@PathVariable String userEmail){

        User use = userService.findUserByEmail(userEmail);
        User userActualizado = null;
        Map<String,Object> response = new HashMap<>();

        if(use == null) {
            response.put("mensaje", "No se ha podido actualizar al usuario porque no se encuentra en el sistema");
            return new ResponseEntity<Map<String,Object>>(response, HttpStatus.NOT_FOUND);
        }

        try {
            use.setUserName(user.getUserName());
            use.setUserCohorte(user.getUserCohorte());
            use.setUserGithub(user.getUserGithub());
            use.setUserLinkedIn(user.getUserLinkedIn());
            use.setUserSecondEmail(user.getUserSecondEmail());
            use.setUserLocation(user.getUserLocation());
            use.setExperienceUser(user.getExperienceUser());
            use.setAboutUser(user.getAboutUser());
            use.setUserTitle(user.getUserTitle());
            use.setUserAge(user.getUserAge());
            use.setUserProfilePicture(user.getUserProfilePicture());

            userActualizado = userService.saveUser(use);

        }catch(DataAccessException e) {
            userService.deleteUserByEmail(userEmail);
        }

        response.put("mensaje", "Usuario actualizado con éxito");
        response.put("usuarioActualizado", userActualizado);

        return new ResponseEntity<Map<String,Object>>(response, HttpStatus.CREATED);

    }


}
