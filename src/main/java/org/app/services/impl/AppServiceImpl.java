package org.app.services.impl;

import org.app.repository.DepartmentRepository;
import org.app.repository.EmployeeCategoryRepository;
import org.app.repository.EmployeeRepository;
import org.app.repository.entity.Department;
import org.app.repository.entity.Employee;
import org.app.repository.entity.EmployeeCategory;
import org.app.services.AppService;
import org.app.services.models.DepartmentDto;
import org.app.services.models.EmployeeCategoryDto;
import org.app.services.models.EmployeeDto;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;

@ApplicationScoped
@Transactional
public class AppServiceImpl implements AppService {
    @Inject
    EmployeeRepository employeeRepository;

    @Inject
    DepartmentRepository departmentRepository;

    @Inject
    EmployeeCategoryRepository employeeCategoryRepository;

    @Override
    public List<EmployeeDto> getEmployees() {
        List<Employee> employeeList = employeeRepository.findAll();
        if (employeeList == null || employeeList.isEmpty()) {
            return null;
        }
        List<EmployeeDto> employeeDtoList = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        for (Employee employee : employeeList) {
            employeeDtoList.add(modelMapper.map(employee, EmployeeDto.class));
        }
        return employeeDtoList;
    }

    @Override
    public List<DepartmentDto> getDepartments() {
        List<Department> departmentList = departmentRepository.findAll();
        if (departmentList == null || departmentList.isEmpty()) {
            return null;
        }
        List<DepartmentDto> departmentDtoList = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        for (Department d : departmentList) {
            departmentDtoList.add(modelMapper.map(d, DepartmentDto.class));
        }
        return departmentDtoList;
    }

    @Override
    public List<EmployeeCategoryDto> getCategories() {
        List<EmployeeCategory> ecList = employeeCategoryRepository.findAll();
        if (ecList == null || ecList.isEmpty()) {
            return null;
        }
        List<EmployeeCategoryDto> ecDtoList = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        for (EmployeeCategory e: ecList) {
            ecDtoList.add(modelMapper.map(e, EmployeeCategoryDto.class));
        }
        return ecDtoList;
    }

    @Override
    public void generateDepartments(){
        Department dep = new Department("Finances", "Department of finances");
        Department dep1 = new Department("HR", "Human resources management");
        departmentRepository.add(dep);
        departmentRepository.add(dep1);
    }

    @Override
    public void generateEmployeeCategory(){
        EmployeeCategory ec = new EmployeeCategory("Wirtschaft");
        employeeCategoryRepository.add(ec);
    }

    @Override
    public EmployeeDto addEmployee(EmployeeDto employee) {
        ModelMapper modelMapper = new ModelMapper();
        if (employee.getEmployeeCategoryId()==null || employee.getDepartmentId()==null){
            return null;
        }
        EmployeeCategory ec = employeeCategoryRepository.findById(employee.getEmployeeCategoryId());
        Department dep = departmentRepository.findById(employee.getDepartmentId());
        Employee emp = modelMapper.map(employee, Employee.class);
        emp.setEmployeeCategory(ec);
        emp.setDepartment(dep);
        emp = employeeRepository.add(emp);
        return modelMapper.map(emp, EmployeeDto.class);
    }

    @Override
    public DepartmentDto getDepartmentByName(String name){
        Department department = departmentRepository.findDepartmentByName(name);
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(department, DepartmentDto.class);
    }

    @Override
    public void generateEmployees(){
        EmployeeCategory ec = employeeCategoryRepository.findById(1);
        Department dep = departmentRepository.findById(1);
        if (dep!=null && ec!=null) {
            Employee employee = new Employee("Sam Smith", ec, dep, "Male", "PR manager", "Public relations manager", 29);
            employeeRepository.add(employee);
        }
    }

    @Override
    public void deleteEmployee(Integer id){
        Employee emp = employeeRepository.findById(id);
        if (emp!=null){
            employeeRepository.delete(id);
        }
    }

    @Override
    public EmployeeDto updateEmployee(Integer id, EmployeeDto emp){
        Employee employee =employeeRepository.findById(id);
        if(employee != null) {
            Department department=departmentRepository.findById(emp.getDepartmentId());
            EmployeeCategory employeeCategory =employeeCategoryRepository.findById(emp.getEmployeeCategoryId());
            employee.setName(emp.getName());
            employee.setAge(emp.getAge());
            employee.setDetails(emp.getDetails());
            employee.setGender(emp.getGender());
            employee.setPosition(emp.getPosition());
            employee.setEmployeeCategory(employeeCategory);
            employee.setDepartment(department);
            employee = employeeRepository.save(employee);
            ModelMapper modelMapper = new ModelMapper();
            return modelMapper.map(employee, EmployeeDto.class);
        }
        return null;
    }

    @Override
    public EmployeeDto findEmployeeById(Integer id){
        Employee employee = employeeRepository.findById(id);
        if(employee == null) {
            return null;
        }
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(employee, EmployeeDto.class);
    }
}
