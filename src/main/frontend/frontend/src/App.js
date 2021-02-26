import logo from './logo.svg';
import './App.css';
import React,  {useState, useEffect} from 'react';
import EmployeeComponent from './components/EmployeeComponent';
import axios from 'axios';
import EmployeeForm from './components/EmployeeForm';


function App() {

 const [data, setData] = useState('');
 
 useEffect(() => {
  loadData();
}, []);

 const loadData = () => {
    axios({
      headers:{
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Credentials":"true",
        "Access-Control-Allow-Methods" : "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        "Access-Control-Allow-Origin": "http://localhost:3000/",
        "Accept": "application/json, text/plain, */*",
      },
      method: 'GET',
      url: 'http://localhost:8080/app/employees',
      responseType: 'json',
    }).then(response => {
      const allEmployees = response.data;
      setData(allEmployees);
    })
  }
  
  return (
    <div>
      <h2>List of employees</h2>
      <EmployeeComponent refreshList={loadData} data={data} />
      <EmployeeForm refreshList={loadData}/>
    </div>
  );
}

export {App};

