package com.sismics.docs.core.util.jpa;

import com.sismics.util.context.ThreadLocalContext;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;
import java.util.List;

/**
 * Generic DAO for JPA entities.
 *
 * @param <T> Entity type
 * @param <ID> ID type
 */
public abstract class GenericDAO<T, ID> {
    /**
     * Gets the entity manager.
     *
     * @return Entity manager
     */
    protected EntityManager getEntityManager() {
        return ThreadLocalContext.get().getEntityManager();
    }

    /**
     * Gets the entity class.
     *
     * @return Entity class
     */
    protected abstract Class<T> getEntityClass();

    /**
     * Creates a new entity.
     *
     * @param entity Entity to create
     * @return Created entity
     */
    public T create(T entity) {
        EntityManager em = getEntityManager();
        em.persist(entity);
        return entity;
    }

    /**
     * Gets an entity by its ID.
     *
     * @param id Entity ID
     * @return Entity
     */
    public T getById(ID id) {
        EntityManager em = getEntityManager();
        return em.find(getEntityClass(), id);
    }

    /**
     * Updates an entity.
     *
     * @param entity Entity to update
     * @return Updated entity
     */
    public T update(T entity) {
        EntityManager em = getEntityManager();
        return em.merge(entity);
    }

    /**
     * Deletes an entity.
     *
     * @param id Entity ID
     */
    public void delete(ID id) {
        EntityManager em = getEntityManager();
        T entity = em.find(getEntityClass(), id);
        if (entity != null) {
            em.remove(entity);
        }
    }

    /**
     * Gets all entities.
     *
     * @return List of entities
     */
    @SuppressWarnings("unchecked")
    public List<T> findAll() {
        EntityManager em = getEntityManager();
        Query q = em.createQuery("select e from " + getEntityClass().getSimpleName() + " e");
        return q.getResultList();
    }

    /**
     * Gets a single result from a query.
     *
     * @param query Query
     * @return Single result
     */
    @SuppressWarnings("unchecked")
    protected T getSingleResult(Query query) {
        try {
            return (T) query.getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
} 