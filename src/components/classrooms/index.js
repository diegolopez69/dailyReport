import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useClassrooms } from '../../hooks/classrooms/useClassrooms';
import TablePagination from '@mui/material/TablePagination';
import { TableFooter } from '@mui/material';
import ModalCreateEditClassroom from './ModalCreateEditClassroom';
import ModalDeleteClassroom from './ModalDeleteClassroom';
const Classrooms =()=> {
  const{classrooms} = useClassrooms();
  const [page, setPage] = React.useState(0);
  const [openModalCreateEdit, setOpenModalCreateEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentClassroom, setCurrentClassroom] = useState({});
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const editItem =( classroom )=>{
    setCurrentClassroom(classroom)
    setOpenModalCreateEdit(true)
  }
  const createItem =(  )=>{
    setCurrentClassroom({})
    setOpenModalCreateEdit(true)
  }
  const deleteItem = (classroom)=>{
    setCurrentClassroom(classroom)
    setOpenModalDelete(true)
  }
  return (
    <>
      <div>
      <div className='header-container'> 
        <button className='bt-add' onClick={()=>createItem()}>Nueva Aula</button>
      </div>
      <div className='container-table-classrooms'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650}} aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell>Nº</TableCell>
                  <TableCell align="right">Planta</TableCell>
                  <TableCell align="right">Número</TableCell>
                  <TableCell align="right">Acciones</TableCell>
              </TableRow>
              </TableHead>

              <TableBody>
              {(rowsPerPage > 0
            ? classrooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : classrooms)
          .map((row, index) => (
                  <TableRow
                  key={row.Classroom_id} tabIndex={-1} 
                  >
                  <TableCell component="th" scope="row">
                      {row.Classroom_id}
                  </TableCell>
                  <TableCell align="right">{row.Floor}</TableCell>
                  <TableCell align="right">{row.Number}</TableCell>
                  <TableCell align="right"><EditIcon className='icon-edit' onClick={()=>editItem(row)}/><DeleteIcon className='icon-delete' onClick={()=>deleteItem(row)} /></TableCell>
                  
                  </TableRow>
              ))}
              </TableBody> 
              <TableFooter>
                <TableRow>  
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={classrooms.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage='Fila por pagina'
                />
                </TableRow>
              </TableFooter>            
          </Table>          
        </TableContainer>
      </div>
    </div>
    {openModalCreateEdit && <ModalCreateEditClassroom openModal={setOpenModalCreateEdit} classroom={Object.keys(currentClassroom).length === 0 ? null: currentClassroom}/>}
    {openModalDelete && <ModalDeleteClassroom openModal={setOpenModalDelete} classroom={currentClassroom}/>}

    </>
  )
}

export default Classrooms