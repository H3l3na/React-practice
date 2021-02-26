import React from 'react';
import Card from '@material-ui/core/Card';
import '../styles/Search.css';
import TextField from '@material-ui/core/TextField';

export default function SearchEmployees ({searchParam, handleChange}) {
const Search = React.memo(props => {
    return (
        <section className="search">
            <Card>
                <div className="search-input" key={searchParam}>
                    <label>Filter by name</label>
                    <input label="Search" variant="outlined" value={searchParam} onChange={handleChange} placeholder="Enter name"/>
                </div>
            </Card>
        </section>
    )
});

return (
         <Search />       
      )
}

