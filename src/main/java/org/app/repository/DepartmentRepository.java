package org.app.repository;

import org.app.repository.entity.Department;
import org.app.repository.entity.Employee;
import org.app.services.models.DepartmentDto;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.Query;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class DepartmentRepository extends Repository<Department, Integer> {
    public DepartmentRepository() {
        super(Department.class);
    }
    public Department findDepartmentByName(String name)
    {
        Query query = entityManager.createQuery("SELECT d FROM Department d where d.name like :name");
        query.setParameter("name", name + '%');
        Department department= (Department) query.getSingleResult();
        return department;
    }
}