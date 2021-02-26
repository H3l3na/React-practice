package org.app;

import org.app.repository.entity.Department;
import org.app.repository.entity.Employee;
import org.app.services.AppService;
import org.app.services.models.DepartmentDto;
import org.app.services.models.EmployeeCategoryDto;
import org.app.services.models.EmployeeDto;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.List;

@Path("/app")
public class AppResource {

    @Inject
    AppService appService;
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "This works";
    }

    @GET
    @Path("/start")
    @Produces(MediaType.APPLICATION_JSON)
    public Response start() {
        appService.generateDepartments();
        appService.generateEmployeeCategory();
        appService.generateEmployees();
        List<DepartmentDto> departmentList = appService.getDepartments();
        if (departmentList==null || departmentList.isEmpty()){
            return Response.noContent().build();
        }
        return Response.ok(departmentList).build();
    }

    @GET
    @Path("/departments/search")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDepartmentByName(@QueryParam("name") String name) {
        DepartmentDto departmentDto = appService.getDepartmentByName(name);
        if(departmentDto == null) {
            return Response.noContent().build();
        }
        return Response.ok(departmentDto).build();
    }


    @GET
    @Path("/employees")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllEmployees()
    {
        List<EmployeeDto> employeeList = appService.getEmployees();
        if(employeeList == null || employeeList.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(employeeList).build();
    }

    @GET
    @Path("/departments")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllDepartments()
    {
        List<DepartmentDto> departmentList = appService.getDepartments();
        if(departmentList == null || departmentList.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(departmentList).build();
    }

    @POST
    @Path("/employees")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createEmployee(EmployeeDto employee, @Context UriInfo uriInfo)
    {
        EmployeeDto employeeDto = appService.addEmployee(employee);
        if(employeeDto!= null) {
            UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();
            uriBuilder.path(Integer.toString(employeeDto.getId()));
            return Response.created(uriBuilder.build()).entity(employeeDto).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @DELETE
    @Path("/employees/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteEmployee(@PathParam("id") Integer id)
    {
        appService.deleteEmployee(id);
        List<EmployeeDto> emList = appService.getEmployees();
        if(emList == null || emList.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(emList).build();
    }

    @PUT
    @Path("/employees/update/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateEmployee(@PathParam("id") Integer id, EmployeeDto employeeDto) {
        EmployeeDto employee = appService.updateEmployee(id, employeeDto);
        if(employee == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(employee).build();
    }

    @GET
    @Path("/categories")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCategories()
    {
        List<EmployeeCategoryDto> ecList = appService.getCategories();
        if(ecList == null || ecList.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(ecList).build();
    }

    @GET
    @Path("/departments")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDepartments()
    {
        List<DepartmentDto> departmentList = appService.getDepartments();
        if(departmentList == null || departmentList.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(departmentList).build();
    }
}