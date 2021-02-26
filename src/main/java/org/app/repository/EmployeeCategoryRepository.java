package org.app.repository;

import org.app.repository.entity.Employee;
import org.app.repository.entity.EmployeeCategory;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class EmployeeCategoryRepository extends Repository<EmployeeCategory, Integer> {
    public EmployeeCategoryRepository() {
        super(EmployeeCategory.class);
    }
}
