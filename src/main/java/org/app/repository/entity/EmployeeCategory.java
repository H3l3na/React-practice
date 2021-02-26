package org.app.repository.entity;


import javax.persistence.*;

@Entity
@Table(schema = "app", name = "EMPLOYEE_CATEGORY")
public class EmployeeCategory extends ModelObject{
    @SequenceGenerator(
            name = "employeeCategorySeq",
            sequenceName = "EMPLOYEE_CATEGORY_SEQ",
            schema = "app",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employeeCategorySeq")
    @Id
    @Column(name = "ID", nullable = false)
    private Integer id;
    private String name;

    public void setId(Integer id){
        this.id=id;
    }

    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name=name;
    }
    @Override
    public Integer getId() {
        return this.id;
    }

    public EmployeeCategory(){
        this.name="Category";
    }
    public EmployeeCategory(String name){
        this.name=name;
    }
}
