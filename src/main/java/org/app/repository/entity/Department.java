package org.app.repository.entity;

import javax.persistence.*;

@Entity
@Table(schema = "app", name = "DEPARTMENT")
public class Department extends ModelObject{
    @SequenceGenerator(
            name = "departmentSeq",
            sequenceName = "DEPARTMENT_SEQ",
            schema = "app",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "departmentSeq")
    @Id
    @Column(name = "ID", nullable = false)
    private Integer id;
    private String name;
    private String description;

    public void setId(Integer id){
        this.id=id;
    }

    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name=name;
    }

    public String getDescription() { return this.description; }

    public void setDescription(String description){ this.description=description; }

    @Override
    public Integer getId() {
        return this.id;
    }
    public Department(){
        name="department";
    }
    public Department(String name, String description){
        this.name=name;
        this.description=description;
    }
}
