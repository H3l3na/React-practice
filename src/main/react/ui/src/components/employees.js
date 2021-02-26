import React, { useEffect, useState, useContext } from 'react';
import '../styles/employees.css';
import { Card } from "@material-ui/core";
import ThumbnailView from './ThumbnailView.js';
import ListView from './ListView.js';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import api from './Api';
import DepartmentSelect from './DepartmentSelect';

export default function EmployeeComponent() {

  return (
    <EmployeeList />
  )
}

const EmployeeList = () => {
  const [data, setData] = useState({});
  const [classicView, setClassicView]=useState(true);
  const [searchParam, setSearchParam]=useState('');
  const [searchDepartmentParam, setSearchDepartmentParam]=useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const[department,setDepartment]=useState('')
  const [departmentObject, setDepartmentObject]=useState(null)
  const [departmentId, setDepartmentId] = useState()
  const [filter, setFilter] = useState('')


  const loadData=()=> {
    api.getData()
    .then(response => {
      const allEmployees = response.data;
      setData(allEmployees);
      setFilteredUsers(allEmployees);
      console.log(allEmployees);
    }).catch(error => {
      console.log(error)
    });
    api.getDepartments()
    .then(response => {
      const allDepartments = response.data;
      setDepartments(allDepartments);
      console.log(allDepartments);
    }).catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    loadData();
  }, []);



  useEffect(() => {
    if (filter !== '') {
      api.getDepartmentByName(filter)
        .then(response => {
          const depObj = response.data;
          setDepartmentObject(depObj);
          setDepartmentId(response.data.id);
          const filteredUsers = data.filter((x) => x.departmentId===response.data.id);
        setFilteredUsers(filteredUsers);
        }).catch(error => {
          console.log(error);
        })
    }
  }, [filter]);


  const toggleListView = () => (event) => {
    setClassicView(true);
  }

  const toggleThumbnailView = () => (event) => {
    setClassicView(false);
  }

  const handleChange=(event)=>{
    setSearchParam(event.target.value)
  }

  const resetFilters = () => {
    setSearchParam('');
    setSearchDepartmentParam(null);
    loadData();
  }

  useEffect(() => {
    if (data.length > 0) {
      if (searchParam!==''){
        const filteredUsers = data.filter((x) => x.name.includes(searchParam));
        setFilteredUsers(filteredUsers);
      } else{
        setFilteredUsers(filteredUsers);
      }
    }
  }, [searchParam]);

  const departmentvalueChange=(val)=>{
     console.log(val)
     setFilter(val)
  }


  if (data?.length > 0) {
    return (
      <div className="usersComponent">
        <div className="actionsContainer">
          <div>
            <div className="iconsContainer">
              <ListIcon className={classicView ? "selected icons" : "icons"} onClick={toggleListView()}></ListIcon>
              <AppsIcon className={classicView ? "icons" : "selected icons"} onClick={toggleThumbnailView()}></AppsIcon>
            </div>
            <div className="search-wrapper">
              <section className="search">
                <Card className="search-card">
                  <div className="search-input" >
                    <input label="Search"  value={searchParam} onChange={handleChange} placeholder="Enter name" />
                  </div>
                  </Card>
                <div className="search-input">
                  <DepartmentSelect department={department} setDepartment={departmentvalueChange} departments={departments} departmentId={departmentId} />
                </div>
                <div className="btn-wrapper">
                  <button className="reset" onClick={resetFilters}>Reset</button>
                </div>
              </section>
            </div>
        </div>
        {classicView? 
        <ListView employees={filteredUsers} refreshList={loadData}/> : <ThumbnailView employees={filteredUsers} refreshList={loadData}/>
        }   
      </div>
      </div>
    )
  } else {
    return (
      <div className="usersList empty">
        <h3>No employees yet</h3>
      </div>
    )
  }
}

