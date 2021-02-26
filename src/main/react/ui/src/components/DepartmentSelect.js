import React, {useState, useEffect, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/DepartmentsSelect.css';
import { CallMerge } from '@material-ui/icons';

const useStyles = makeStyles({
    option: {
      fontSize: 15,
    },
  });


export default function DepartmentSelect({department,setDepartment,departments, departmentId}) {

    const defaultProps = {
        options: departments,
        getOptionLabel: (option) => option.name,
      };
    
      const flatProps = {
        options: departments.map((option) => option.name),
      };

      const handleInputChange = (event, value) => {
          setDepartment(event.target.value);
    };    

      return(
          <div className="wrapper" style={{ width: 200, textAlign:'left' }}>
              <Autocomplete
                  {...defaultProps}
                  getOptionSelected={(option, value) => {
                     if(value.name!=='' && value.name!==null){
                        setDepartment(value.name)
                     }
                        
                      return option.value === value.value}}
                  id={departments.id}
                  debug
                  renderInput={(params) => <TextField {...params} label="Choose a department" margin="normal" 
                  onChange={handleInputChange}
                  value={department}
                  />}
              />
          </div>
      );
}