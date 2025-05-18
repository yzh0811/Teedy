package com.sismics.docs.core.model.jpa;

import jakarta.persistence.*;
import java.util.Date;

/**
 * User registration request entity.
 */
@Entity
@Table(name = "T_REGISTRATION_REQUEST")
public class UserRegistrationRequest {
    /**
     * Request ID.
     */
    @Id
    @Column(name = "REQ_ID_C", length = 36)
    private String id;
    
    /**
     * Username.
     */
    @Column(name = "REQ_USERNAME_C", length = 50, nullable = false)
    private String username;
    
    /**
     * Password.
     */
    @Column(name = "REQ_PASSWORD_C", length = 100, nullable = false)
    private String password;
    
    /**
     * Email.
     */
    @Column(name = "REQ_EMAIL_C", length = 100, nullable = false)
    private String email;
    
    /**
     * Status: PENDING, APPROVED, REJECTED
     */
    @Column(name = "REQ_STATUS_C", length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;
    
    /**
     * Creation date.
     */
    @Column(name = "REQ_CREATEDATE_D", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    
    /**
     * Update date.
     */
    @Column(name = "REQ_UPDATEDATE_D")
    private Date updateDate;
    
    /**
     * Admin who processed the request.
     */
    @Column(name = "REQ_ADMIN_ID_C", length = 36)
    private String adminId;

    public enum Status {
        PENDING,
        APPROVED,
        REJECTED
    }

    public String getId() {
        return id;
    }

    public UserRegistrationRequest setId(String id) {
        this.id = id;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public UserRegistrationRequest setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserRegistrationRequest setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public UserRegistrationRequest setEmail(String email) {
        this.email = email;
        return this;
    }

    public Status getStatus() {
        return status;
    }

    public UserRegistrationRequest setStatus(Status status) {
        this.status = status;
        return this;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public UserRegistrationRequest setCreateDate(Date createDate) {
        this.createDate = createDate;
        return this;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public UserRegistrationRequest setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
        return this;
    }

    public String getAdminId() {
        return adminId;
    }

    public UserRegistrationRequest setAdminId(String adminId) {
        this.adminId = adminId;
        return this;
    }
} 