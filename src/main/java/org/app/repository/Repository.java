package org.app.repository;

import org.app.repository.entity.ModelObject;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Repository<T extends ModelObject, PK extends Serializable> {

    private Map<Integer, T> objectMap = new HashMap<>();

    private Class<T> entityClass;

    protected Repository(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    @Inject
    EntityManager entityManager;

    public T add(T modelObject)
    {
        modelObject.setCreatedOn(LocalDateTime.now());
        modelObject.setModifiedOn(LocalDateTime.now());
        entityManager.persist(modelObject);
        return modelObject;
    }

    public List<T> findAll() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> cq = cb.createQuery(this.entityClass);
        Root<T> root = cq.from(this.entityClass);
        CriteriaQuery<T> all = cq.select(root);
        TypedQuery<T> allQuery = entityManager.createQuery(all);
        return allQuery.getResultList();
    }

    public T findById(PK id)
    {
        T result = entityManager.find(this.entityClass, id);
        if(result != null) {
            return result;
        }
        return null;
    }

    public T save(T modelObject)
    {
        T result = null;
        PK id = (PK)modelObject.getId();
        if(id != null) {
            result = findById(id);
        }
        if(id == null || result!= null) {
            entityManager.persist(modelObject);
            return modelObject;
        }
        return null;
    }

   /* public T update(Integer id, T t)
    {
        if(objectMap.containsKey(id)) {
            objectMap.put(id, t);
            return t;
        }
        return null;
    }*/

   public T update(T object) {
       T result = entityManager.find(this.entityClass, object.getId());
       if(result != null) {
           return this.entityManager.merge(result);
       }
       return null;
   }

    public void delete(Integer id){
        T result = entityManager.find(this.entityClass, id);
        if(result != null) {
            entityManager.remove(result);
        }
    }

    /*public List<T> findGeneric(T modelObject){
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<T> cq = cb.createQuery(this.entityClass);
        Root<T> root = cq.from(this.entityClass);
        if (this.entityClass==DisneyCharacter){
        CriteriaQuery<T> all = cq.select(root).where(cb.equal(root.get("name"), name));
        TypedQuery<T> allQuery = entityManager.createQuery(all);
        return allQuery.getResultList(); }
        else {
            CriteriaQuery<T> all = cq.select(root);
            TypedQuery<T> allQuery = entityManager.createQuery(all);
            return allQuery.getResultList(); }
    }*/

}
