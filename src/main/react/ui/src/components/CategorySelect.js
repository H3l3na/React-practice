import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    option: {
      fontSize: 15,
    },
  });

export default function CategorySelect({employees}) {

    const defaultProps = {
        options: employees,
        getOptionLabel: (option) => option.name,
      };
    
      const flatProps = {
        options: employees.map((option) => option.name),
      };
    
      const [value, setValue] = React.useState(null);

      const handleChange = (event) => {
       setValue(event.target.value);
    }

      return(
          <div style={{ width: 200, textAlign:'left' }}>
              <Autocomplete
                  {...defaultProps}
                  id="category"
                  debug
                  renderInput={(params) => <TextField {...params} label="Choose a category" margin="normal"
                  onChange={handleChange} />
                }
              />
          </div>
      );
}