package com.gensphere.ProjectoGensphere.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="users")
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="email")
    private String userEmail;
    @Column(name="name")
    private String userName;
    @Column(name="password")
    private String userPassword;
    @Column(name="id_cohorte")
    private Long userCohorte;
    @Column(name="profile_picture")
    private String userProfilePicture;

    @Column(name="github")
    private String userGithub;
    @Column(name="linkedin")
    private String userLinkedIn;

    @Column(name="date")
    private String userJoinedDate;

    @Column(name="second_email")
    private String userSecondEmail;

    @Column(name="title")
    private String userTitle;

    @Column(name="ubication")
    private String userLocation;

    @Column(name="age")
    private String userAge;

    @Column(name="about")
    private String aboutUser;

    @Column(name="experience")
    private String experienceUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public Long getUserCohorte() {
        return userCohorte;
    }

    public void setUserCohorte(Long userCohorte) {
        this.userCohorte = userCohorte;
    }

    public String getUserProfilePicture() {
        return userProfilePicture;
    }

    public void setUserProfilePicture(String userProfilePicture) {
        this.userProfilePicture = userProfilePicture;
    }

    public String getUserGithub() {
        return userGithub;
    }

    public void setUserGithub(String userGithub) {
        this.userGithub = userGithub;
    }

    public String getUserLinkedIn() {
        return userLinkedIn;
    }

    public void setUserLinkedIn(String userLinkedIn) {
        this.userLinkedIn = userLinkedIn;
    }

    public String getUserJoinedDate() {
        return userJoinedDate;
    }

    public void setUserJoinedDate(String userJoinedDate) {
        this.userJoinedDate = userJoinedDate;
    }

    public String getUserSecondEmail() {
        return userSecondEmail;
    }

    public void setUserSecondEmail(String userSecondEmail) {
        this.userSecondEmail = userSecondEmail;
    }

    public String getUserTitle() {
        return userTitle;
    }

    public void setUserTitle(String userTitle) {
        this.userTitle = userTitle;
    }

    public String getUserLocation() {
        return userLocation;
    }

    public void setUserLocation(String userLocation) {
        this.userLocation = userLocation;
    }

    public String getUserAge() {
        return userAge;
    }

    public void setUserAge(String userAge) {
        this.userAge = userAge;
    }

    public String getAboutUser() {
        return aboutUser;
    }

    public void setAboutUser(String aboutUser) {
        this.aboutUser = aboutUser;
    }

    public String getExperienceUser() {
        return experienceUser;
    }

    public void setExperienceUser(String experienceUser) {
        this.experienceUser = experienceUser;
    }

    public User() {
    }

    public User(Long id, String userEmail, String userName, String userPassword, Long userCohorte) {
        this.id = id;
        this.userEmail = userEmail;
        this.userName = userName;
        this.userPassword = userPassword;
        this.userCohorte = userCohorte;
    }

    public User(Long id, String userEmail, String userName, String userPassword, Long userCohorte, String userProfilePicture, String userGithub, String userLinkedIn, String userJoinedDate, String userSecondEmail, String userTitle, String userLocation, String userAge, String aboutUser, String experienceUser) {
        this.id = id;
        this.userEmail = userEmail;
        this.userName = userName;
        this.userPassword = userPassword;
        this.userCohorte = userCohorte;
        this.userProfilePicture = userProfilePicture;
        this.userGithub = userGithub;
        this.userLinkedIn = userLinkedIn;
        this.userJoinedDate = userJoinedDate;
        this.userSecondEmail = userSecondEmail;
        this.userTitle = userTitle;
        this.userLocation = userLocation;
        this.userAge = userAge;
        this.aboutUser = aboutUser;
        this.experienceUser = experienceUser;
    }

    private static final long serialVersionUID = 1L;
}
