package org.app.services;

import org.app.repository.entity.Department;
import org.app.repository.entity.Employee;
import org.app.services.models.DepartmentDto;
import org.app.services.models.EmployeeCategoryDto;
import org.app.services.models.EmployeeDto;

import java.util.List;

public interface AppService {
    List<EmployeeDto> getEmployees();
    void generateDepartments();
    List<DepartmentDto> getDepartments();
    void generateEmployees();
    void generateEmployeeCategory();
    List<EmployeeCategoryDto> getCategories();
    EmployeeDto addEmployee(EmployeeDto employee);
    void deleteEmployee(Integer id);
    EmployeeDto updateEmployee(Integer id, EmployeeDto employee);
    EmployeeDto findEmployeeById(Integer id);
    DepartmentDto getDepartmentByName(String name);
   // List<DepartmentDto> getDepartments();
    //List<EmployeeDto> getEmployeesByDepartment(DepartmentDto department);
    //List<EmployeeDto> getEmployeesByCategory(EmployeeCategoryDto employeeCategory);
    //EmployeeDto findEmployeeById(Integer id);
}
