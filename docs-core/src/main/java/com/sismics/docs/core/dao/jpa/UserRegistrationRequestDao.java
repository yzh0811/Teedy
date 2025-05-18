package com.sismics.docs.core.dao.jpa;

import com.sismics.docs.core.model.jpa.UserRegistrationRequest;
import com.sismics.docs.core.util.jpa.GenericDAO;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import java.util.List;
import java.util.UUID;
import java.util.Date;

/**
 * User registration request DAO.
 */
public class UserRegistrationRequestDao extends GenericDAO<UserRegistrationRequest, String> {
    @Override
    protected Class<UserRegistrationRequest> getEntityClass() {
        return UserRegistrationRequest.class;
    }

    /**
     * Gets a user registration request by ID.
     *
     * @param id Request ID
     * @return User registration request
     */
    public UserRegistrationRequest getById(String id) {
        EntityManager em = getEntityManager();
        return em.find(UserRegistrationRequest.class, id);
    }

    /**
     * Creates a new user registration request.
     *
     * @param request User registration request
     * @return Created request
     */
    public UserRegistrationRequest create(UserRegistrationRequest request) {
        // Set required fields
        request.setId(UUID.randomUUID().toString());
        request.setStatus(UserRegistrationRequest.Status.PENDING);
        request.setCreateDate(new Date());
        
        // Create the request
        return super.create(request);
    }

    /**
     * Gets a user registration request by username.
     *
     * @param username Username
     * @return User registration request
     */
    public UserRegistrationRequest getByUsername(String username) {
        EntityManager em = getEntityManager();
        Query q = em.createQuery("select r from UserRegistrationRequest r where r.username = :username");
        q.setParameter("username", username);
        return getSingleResult(q);
    }

    /**
     * Gets a user registration request by email.
     *
     * @param email Email
     * @return User registration request
     */
    public UserRegistrationRequest getByEmail(String email) {
        EntityManager em = getEntityManager();
        Query q = em.createQuery("select r from UserRegistrationRequest r where r.email = :email");
        q.setParameter("email", email);
        return getSingleResult(q);
    }

    /**
     * Gets all pending user registration requests.
     *
     * @return List of pending user registration requests
     */
    @SuppressWarnings("unchecked")
    public List<UserRegistrationRequest> getPendingRequests() {
        EntityManager em = getEntityManager();
        Query q = em.createQuery("select r from UserRegistrationRequest r where r.status = :status order by r.createDate");
        q.setParameter("status", UserRegistrationRequest.Status.PENDING);
        return q.getResultList();
    }
} 