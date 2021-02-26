package org.app;

import org.app.repository.entity.Department;
import org.app.repository.entity.EmployeeCategory;
import org.junit.platform.engine.support.hierarchical.DefaultParallelExecutionConfigurationStrategy;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceException;
import javax.persistence.Table;
import javax.persistence.metamodel.EntityType;
import javax.transaction.Transactional;
import java.time.LocalDateTime;

@ApplicationScoped
public class EntityTestExecutor {
    @Inject EntityManager entityManager_;

    @Transactional
    public void executeTests() {
        this.createEmployeeCategoryEntity();
        this.createDepartment();
    }

    private void createEmployeeCategoryEntity() {
        EmployeeCategory employeeCategory = new EmployeeCategory();
        employeeCategory.setName("Category 1");
        //employeeCategory.setId(1);
       // employeeCategory.setCreatedOn(LocalDateTime.now());
       // employeeCategory.setModifiedOn(LocalDateTime.now());
        merge(employeeCategory);
    }

    private void createDepartment() {
        Department department = new Department();
        department.setName("Finances");
        department.setDescription("Department of finances");
        //department.setId(1);
       // department.setCreatedOn(LocalDateTime.now());
        //department.setModifiedOn(LocalDateTime.now());
        merge(department);

        Department department1 = new Department();
        department1.setName("HR");
        department1.setDescription("Human resources management");
        //department1.setId(2);
        merge(department1);
       // department1.setDescription("Human resources department");
        //department1.setCreatedOn(LocalDateTime.now());
       // department1.setModifiedOn(LocalDateTime.now());
    }

    private<T> void merge(T entity) {
        entityManager_.merge(entity);
    }
}
