 import React from 'react';
 import axios from 'axios';
 import '../App.css';

 export default function EmployeeComponent(props){
    const deleteEmployeeHandler = (employeeId) => {
        axios.delete("http://localhost:8080/app/employees/delete/", { params: { id: employeeId } }).then(response => {
            console.log(response);
          });
     } 

    const deleteRow=(id, e)=>{
        axios.delete(`http://localhost:8080/app/employees/delete/${id}`)
          .then(res => {
            props.refreshList();
            console.log(res);
            console.log(res.data);
          })
      
      }

     const displayEmployees = (props) => {
         const {data} = props;
         if (data.length>0){
                     return (
                        data.map((employee, index) => {
                        console.log(employee);
                         return (
                         <div>
                         <div id="outer" key={employee.id}>
                         <div className="inner"><button onClick={(e) => deleteRow(employee.id, e)}>Delete</button></div>
                            <div className="inner"><p>{employee.name}</p></div>
                         </div>
                         </div>
                         )
                    })
                 )
             
            } else {
             return (<h3>No employees yet</h3>)
         }
     }
     return (
         <>
         {displayEmployees(props)}
         </>
     )
 }
// import EmployeeService from '../services/AppService';

// class EmployeeComponent extends React.Component {
//     super(){
//         this.state = {
//             users: []
//         }
//     };
//    componentDidMount(){
//     EmployeeService.getEmployees().then((response) => {
//         this.setState({users: response.data})
//     });
//    }
   
//      render(){
//          return(
           
//              <div>
//                  <h1 className="text-center">Employee list</h1>
                
//                  <table className="table table-striped">
//                     <thead>
//                         <tr>
//                             <td>Employee name</td>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             this.state.users.map(user => 
//                                 <tr key={user.id}>
//                                     <td>{user.name}</td>
//                                 </tr>
//                             )
//                         }
//                     </tbody>
//                  </table>
//              </div>
//          )
//      } 
// };
 

// export default EmployeeComponent;