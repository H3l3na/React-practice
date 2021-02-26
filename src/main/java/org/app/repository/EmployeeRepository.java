package org.app.repository;

import org.app.repository.entity.Employee;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class EmployeeRepository extends Repository<Employee, Integer> {
    public EmployeeRepository() {
        super(Employee.class);
    }
    public void generateEmployees(){

    }
}
