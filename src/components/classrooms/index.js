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
import { TableFooter, TablePagination } from '@mui/material';
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
        <button className='bt-add-modal' onClick={()=>createItem()}>Nueva Aula</button>
      </div>
      <div className='container-table-classrooms'>
        <TableContainer component={Paper} sx={{ minWidth: 150, align:"center"}} >
          <Table sx={{ minWidth: 150, maxWidth: 900}} aria-label="simple table" align="center">
              <TableHead >
              <TableRow>
                  <TableCell width="70px" height="80px"> Nº</TableCell>
                  <TableCell width="100px" align="center">Planta</TableCell>
                  <TableCell  width="100px" align="center">Número</TableCell>
                  <TableCell  width="100px" align="center">Acciones</TableCell>
              </TableRow>
              </TableHead>

              <TableBody>
              {(rowsPerPage > 0
                  ? classrooms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : classrooms)
                .map((row, index) => (
                  <TableRow
                  key={index}
                  >
                  <TableCell>
                      {row.Classroom_id}
                  </TableCell>
                  <TableCell align="center">{row.Floor}</TableCell>
                  <TableCell align="center">{row.Number}</TableCell>
                  <TableCell align="center"><EditIcon className='icon-edit' onClick={()=>editItem(row)}/><DeleteIcon className='icon-delete' onClick={()=>deleteItem(row)} /></TableCell>
                  
                  </TableRow>
              ))}
              </TableBody> 
              <TableFooter >
                <TableRow >  
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  count={classrooms.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage='Fila por pagina'
                  labelDisplayedRows={({ from, to, count }) => `Mostrando ${from} al ${to} de ${count} elementos`}
                  style={{ justifyContent: 'center'}}
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