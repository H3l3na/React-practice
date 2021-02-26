package org.app.services.models;

public class EmployeeDto {
    private Integer id;
    private String name;
    private Integer employeeCategoryId;
    private Integer departmentId;
    private Integer age;
    private String details;
    private String gender;
    private String position;

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name=name;
    }

    public String getGender(){
        return this.gender;
    }

    public void setGender(String gender){
        this.gender=gender;
    }
    public String getPosition(){
        return position;
    }
    public void setPosition(String position){
        this.position=position;
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

    public Integer getId(){
        return id;
    }

    public void setId(Integer id){
        this.id=id;
    }

    public Integer getEmployeeCategoryId(){
        return employeeCategoryId;
    }

    public void setEmployeeCategoryId(Integer employeeCategoryId){
        this.employeeCategoryId=employeeCategoryId;
    }

    public Integer getDepartmentId(){
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId){
        this.departmentId=departmentId;
    }
}
