package org.app.services.models;

public class EmployeeCategoryDto {
    private Integer id;
    private String name;

    public Integer getId(){
        return id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name=name;
    }
}
