package org.app.repository.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(schema = "app", name = "EMPLOYEE")
public class Employee extends ModelObject {
    @SequenceGenerator(
            name = "employeeSeq",
            sequenceName = "EMPLOYEE_SEQ",
            schema = "app",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employeeSeq")
    @Id
    @Column(name = "ID", nullable = false)
    private Integer id;

    private Integer age;
    private String gender;
    private String details;
    private String name;
    private String position;

    /*private Integer departmentId;
    private Integer employeeCategoryId;

    public Integer getDepartmentId(){
        return departmentId;
    }

    public Integer getEmployeeCategoryId(){
        return employeeCategoryId;
    }

    public void setEmployeeCategoryId(Integer employeeCategoryId){
        this.employeeCategoryId=employeeCategoryId;
    }

    public void setDepartmentId(Integer departmentId){
        this.departmentId=departmentId;
    }*/

    @ManyToOne
    private EmployeeCategory employeeCategory;

    @ManyToOne
    private Department department;

    public Department getDepartment(){
        return department;
    }

    public void setDepartment(Department department){
        this.department=department;
    }

    public EmployeeCategory getEmployeeCategory() {
        return employeeCategory;
    }

    public void setEmployeeCategory(EmployeeCategory employeeCategory) {
        this.employeeCategory = employeeCategory;
    }

    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name=name;
    }
    public String getPosition(){
        return position;
    }
    public void setPosition(String position){
        this.position=position;
    }

    public String getGender(){
        return this.gender;
    }

    public void setGender(String gender){
        this.gender=gender;
    }

    public String getDetails(){
        return this.details;
    }

    public void setDetails(String details){
        this.details=details;
    }

    public Integer getAge(){
        return this.age;
    }

    public void setAge(Integer age){
        this.age=age;
    }

    @Override
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id){
        this.id=id;
    }

    public Employee(String name, EmployeeCategory ec, Department d, String gender, String position, String details, Integer age){
        this.name=name;
        this.employeeCategory=ec;
        this.department=d;
        this.position=position;
        this.gender=gender;
        this.age=age;
        this.details=details;
    }
    public Employee(){
        this.name="John doe";
        this.employeeCategory=null;
        this.department=null;
    }
}

