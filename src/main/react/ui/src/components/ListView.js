import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/employees.css';
import '../styles/dialog.css';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import cat from '../images/cat.jpg';
import AddEmployeeDialog from './AddEmployeeDialog';
import ShowEmployeeInfoDialog from './ShowEmployeeInfoDialog';
import EditEmployeeDialog from './EditEmployeeDialog';
import api from './Api';
import AuthContextProvider, { AuthContext } from './context';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SearchIcon from '@material-ui/icons/Search';
import DepartmentSelect from './DepartmentSelect';


//Table pagination set up
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
//end of table pagination set up

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ListView({ employees, refreshList }) {

  const [selectedUser, setSelectedUser] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const role = authContext.role;

  //Table pagination set up
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage]=React.useState(5);

  useEffect(() => {
    if(employees.length>5){
      setRowsPerPage(5);
    }else {
      setRowsPerPage(employees.length);
    }
  }, [employees.length]);
  
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, employees.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
//end of table pagination set up

  const deleteRow=(id, e) => {
    api.delete(id)
    .then(response => {
      const allEmployees = response.data;
      refreshList();
    }).catch(error => {
      console.log(error)
    })
    setRowsPerPage(rowsPerPage-1);
  }

  const editEmployee = (value) => (event) =>{
    setSelectedUser(value)
    setIsEditDialogOpen(true)
  }

  const addDialogHandleClose = () => {
    setIsAddDialogOpen(false)
  }

  const editDialogHandleClose = () => {
    setIsEditDialogOpen(false)
  }


  const addEmployee = () => (event) => {
    setIsAddDialogOpen(true)
  }

  const openShowEmployeeInfoDialog = (value) => (event) => {
    setSelectedUser(value)
    setIsDialogOpen(true)
  }

  const addDialogHandleSaveAndClose = (user, showErrorMessage) => {
    if (showErrorMessage){
      setIsAddDialogOpen(true)
    }
   
  }

  const editDialogHandleSaveAndClose = (user, showErrorMessage) => {
    if(showErrorMessage){
    setIsEditDialogOpen(true)
    }
  }

  const handleClose = () => {
    setIsDialogOpen(false)
  }

  const handleSaveAndClose = (user) => {
    setIsDialogOpen(false)
  }

  const displayEmployees = (employees) => {
    if (employees != null) {
      return (
        <div className="usersComponent">
          {role==='Admin' || role==='admin'?<button className="btn-add" onClick={addEmployee()}>Add employee</button>:null}
          <div className="usersList">
            <TableContainer component={Paper}>
              <Table  className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Age</StyledTableCell>
                    <StyledTableCell>Gender</StyledTableCell>
                    <StyledTableCell>Position</StyledTableCell>
                    <StyledTableCell>Details</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    {role=='Admin' || role==='admin'?<StyledTableCell></StyledTableCell>:null }
                    {role==='Admin' || role==='admin'?<StyledTableCell></StyledTableCell>:null }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : employees
                  ).map((employee) => (
                    <StyledTableRow key={employee.id}>
                      <TableCell component="th" scope="row">
                          <img src={cat} height="50" width="50"></img>
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="left">
                        {employee.name}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="left">
                        {employee.age}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="left">
                        {employee.gender}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="left">
                        {employee.position}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="left">
                        {employee.details}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                       <Tooltip title="Searcg employee" placement="top" arrow={true}>
                          <SearchIcon
                            className="actionIcon"
                            onClick={openShowEmployeeInfoDialog(employee)} 
                          />
                        </Tooltip>
                      </TableCell>
                      {role==='Admin' || role==='admin'?
                      <TableCell style={{ width: 160 }} align="right">
                       <Tooltip title="Edit employee" placement="top" arrow={true}>
                          <EditIcon
                            className="actionIcon"
                            onClick={editEmployee(employee)} 
                          />
                        </Tooltip>
                      </TableCell>:null}
                      {role === 'Admin' || role==='admin'?
                      <TableCell style={{ width: 160 }} align="right">
                       <Tooltip title="Delete employee" placement="top" arrow={true}>
                          <DeleteIcon
                            className="actionIcon"
                            onClick={(e) => deleteRow(employee.id, e)}
                          />
                        </Tooltip> 
                      </TableCell>: null}
                    </StyledTableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                <TableRow> 
                 {role==='Admin' || role==='admin'?
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={9} 
                      count={employees.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                    :
                    <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={7} 
                    count={employees.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                   }
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
          {selectedUser && <ShowEmployeeInfoDialog open={isDialogOpen} handleClose={handleClose} selectedUser={selectedUser} handleSaveAndClose={handleSaveAndClose} />}
          {<AddEmployeeDialog open={isAddDialogOpen} addDialogHandleClose={addDialogHandleClose} /*selectedUser={selectedUser} */ addDialogHandleSaveAndClose={addDialogHandleSaveAndClose} refreshList={refreshList} />}
          {selectedUser && <EditEmployeeDialog editDialogHandleClose={editDialogHandleClose} open={isEditDialogOpen}  selectedUser={selectedUser} editDialogHandleSaveAndClose={editDialogHandleSaveAndClose} refreshList={refreshList} />} 
        </div>
      )
    } else {
      return (
        <div className="usersList">
          <p>No employees yet </p>
          <button className="btn-add" onClick={addEmployee()}>Add employee</button>
        </div>
      )
    }
  }

  return (
    <>
      {displayEmployees(employees)}
    </>
  )
}

