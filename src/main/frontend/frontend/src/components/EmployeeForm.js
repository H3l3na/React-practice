import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';

class EmployeeForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name:'',
        departmentId:'', 
        employeeCategoryId:''
      }
  
      // this.handleChange = this.handleChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    // handleChange(event) {
    //   this.setState({value: event.target.value});
    // }
  
    // handleSubmit(event) {
    //   alert('A name was submitted: ' + this.state.value);
    //   event.preventDefault();
    // }

  


    changeHandler = e => {
      this.setState({[e.target.name]: e.target.value});
    }

    submitHandler = e => {
      e.preventDefault();
      console.log(this.state);
      axios.post('http://localhost:8080/app/employees',  this.state )
      .then(res => {
       this.props.refreshList();
        console.log(res); 
        console.log(res.data);
        console.log(this.state);
      }); 
    }

    clearInputHandler = e => {
          this.state.name='';
          this.state.employeeCategoryId='';
          this.state.departmentId='';
    }
  
    render() {
      const {name, departmentId, employeeCategoryId} = this.state
      return (
        <div className="field">
        <form onSubmit={this.submitHandler}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.changeHandler} placeholder="Joe Smith"/>
          </label>
          <label >
          Department ID:
            
            <input type="number" name="departmentId" value={this.state.departmentId} onChange={this.changeHandler} placeholder="ID"/>
            </label>
          <label>
            Employee Category ID:
            <input type="number" name="employeeCategoryId" value={this.state.employeeCategoryId} onChange={this.changeHandler} placeholder="ID"/>
          </label>
          <button class="btn submit" type="submit">Add</button>
        </form>
        </div>
      );
    }
  }

  export default EmployeeForm;