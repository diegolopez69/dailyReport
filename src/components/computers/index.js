import React from 'react'
import CardComputer from './CardComputer'
import { useState } from 'react'
import '../../assets/css/computer/index.css'
import ModalCreateEditComputer from '../computers/ModalCreateEditComputer'
import { useComputers } from '../../hooks/computers/useComputers'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableFooter } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
const Computers = ()=> {
  
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModalCreate , setOpenModalCreate] = useState(false);
  const [currentComputer, setCurrentComputer ] = useState();
  const [openOkResponse, setOkResponse] =useState(false);
  const [openErrorResponse, setErrorResponse] =useState(false);
  const [deleteComputerOk, setDeleteComputerOk] =useState(false);
  const [deleteComputerError, setDeleteComputerError] = useState(false);
  const [page, setPage] = useState(0);
  const [nameControl, setNameControl] = useState('');
  const {computers, deleteComputerById} = useComputers();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCreateEditComputer =(computer)=>{
    setCurrentComputer(computer);    
    setOpenModalCreate(true)
  }

  const handleCloseOk = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setDeleteComputerOk(false);
    setOkResponse(false);
  };
  const handleCloseError = (event, reason) => {
      if (reason === 'clickaway') {
          return;
      }

      setErrorResponse(false);
      setDeleteComputerError(false)
  };
  const deleteComputer = async(computer)=>{
    const result = await deleteComputerById(computer);
    if(result ==200){
        setDeleteComputerOk(true)
        setOkResponse(true)
    }else{            
        setDeleteComputerError(true)
        setErrorResponse(true)
    }
  }
  const handleClearControl =()=>{
    setNameControl('')
  }
  return (
    <>
      <div className='div-container-title-addbt'>
        <h5 className='tittle-page'>Ordenadores</h5>
        <button className='bt-add-default' onClick={()=>handleCreateEditComputer({})}><AddIcon className='icon-add-default'/> NUEVA</button>
      </div>
      <div className='body-computers'>
        <div className='tables-type-computer-body'>
        <div className='container-control-computer-principal'>
          <Box sx={{ minWidth: 330, maxWidth: 330, marginRight:12, marginTop:0}}>
          <FormControl fullWidth>
              <TextField 
                  sx={{ minWidth:430, textAlign:'left', maxHeight:10, marginBottom:8.5}}
                      id="outlined-required"
                      label="Nombre"
                      type='email'
                      value={nameControl}
                      onChange={(event)=>setNameControl(event.target.value)}
              />
          </FormControl>
          </Box>
          <button className='bt-add-default' style={{marginTop:1, marginLeft:20, marginRight:4}} onClick={handleClearControl}>LIMPIAR</button>
        </div>
          <TableContainer component={Paper} sx={{ minWidth: 150, align:"center"}} >
              <Table sx={{ }} aria-label="simple table" align="center">
                  <TableHead>
                  <TableRow style={{ backgroundColor: '#eeeeee', height:'20px'}}>
                      <TableCell width="10px" style={{fontFamily:'Open Sans', fontSize:'16px'}} >Nº</TableCell>
                      <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Nombre</TableCell>
                      <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Serie</TableCell>
                      <TableCell width="100px" align="center" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Acciones</TableCell>
                  </TableRow>
                  </TableHead>

                  <TableBody>
                  {computers.length == 0 ?  <TableCell align="center"></TableCell>
                  :    
                  (rowsPerPage > 0
                      ? computers
                        .filter((element)=> nameControl == '' ? element: (element.Name.includes(nameControl)))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : computers
                        .filter((element)=> nameControl == '' ? element: (element.Name.includes(nameControl))))                      
                      .map((row, index) => {
                      return(
                      <TableRow key={index} style={{height:'20px'}}>  
                          <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{index}</TableCell>
                          <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.Name}</TableCell>
                          <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>Serie</TableCell>
                          <TableCell align="center"><EditIcon className='icon-edit' onClick={ ()=>handleCreateEditComputer(row)} /><DeleteIcon className='icon-delete' onClick={()=>deleteComputer(row)}/></TableCell>
                      </TableRow>
                      )
                  }
                  )
                  }
                  </TableBody> 
                  <TableFooter >
                      <TableRow >  
                      <TablePagination
                      rowsPerPageOptions={[5, 10]}
                      count={computers.filter((element)=> nameControl == '' ? element: (element.Name.includes(nameControl))).length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage='Fila por páginas'
                      labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count}`}
                      style={{ justifyContent: 'center'}}
                      />
                      </TableRow>
                  </TableFooter>            
              </Table>          
          </TableContainer>
        </div>
      </div>
      {openModalCreate && <ModalCreateEditComputer openModal={setOpenModalCreate} computer={Object.keys(currentComputer).length === 0 ? null:currentComputer} responseOk={setOkResponse} responseError={setErrorResponse}/>}
      <Snackbar open={openOkResponse} autoHideDuration={2000} onClose={handleCloseOk}>
        <MuiAlert onClose={handleCloseOk} severity="success" sx={{ width: '100%' }}>
            {deleteComputerOk? "Se eliminó correctamente": "Se guardó correctamente!!"}
        </MuiAlert>
      </Snackbar>
      <Snackbar open={openErrorResponse} autoHideDuration={2000} onClose={handleCloseError}>
          <MuiAlert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
              {deleteComputerError? "Error al eliminar el item, inténtalo más tarde": "Error al guardar el Ítem, inténtalo más tarde"}
          </MuiAlert>
      </Snackbar>
    </>
    
  )
}

export default Computers