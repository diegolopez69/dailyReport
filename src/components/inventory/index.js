import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../../assets/css/inventory/index.css'
import { floors } from './default-data';
import {useClassrooms} from '../../hooks/classrooms/useClassrooms' 
import ClassroomsContainer from './ClassroomsContainer';
import { useInventory } from '../../hooks/inventory/useInventory';
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
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ModalCreateInventory from './ModalCreateInventory';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
const InventoryGeneral = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {classrooms} = useClassrooms();
  const [classroomControl, setClassroomControl] = useState('');
  const [floorControl, setFloorControl] = useState('');
  const [currentInventory, setCurrentInventory] = useState({});  
  const [openOkResponse, setOkResponse] =useState(false);
  const [openErrorResponse, setErrorResponse] =useState(false);
  const [deleteComputerOk, setDeleteComputerOk] =useState(false);
  const [deleteComputerError, setDeleteComputerError] = useState(false);
  const [openModalCreateEdit, setOpenModalCreateEdit] = useState(false);
  const {inventory, createInventory, deleteInventoryById} =useInventory();
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCreateEditInventory=(inventory)=>{
    setCurrentInventory(inventory)
    setOpenModalCreateEdit(true)
  }
  const handleDeleteInventory = async(inventory)=>{

    const result = await deleteInventoryById(inventory);
    if(result == 200){
        setDeleteComputerOk(true)
        setOkResponse(true)
    }else{            
        setDeleteComputerError(true)
        setErrorResponse(true)
    }
  }
  const handleClearControl = ()=>{
    setClassroomControl('')
    setFloorControl('')
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
  return (
      <>
       <div className='div-container-title-addbt'>
        <h5 className='tittle-page'>Inventario por aula</h5>
        <button className='bt-add-default' onClick={()=>handleCreateEditInventory({})}><AddIcon className='icon-add-default'/> NUEVA</button>
      </div>
      <div className='body-inventory'>      
        <div className='tables-type-inventory-body'>
        <div className='container-control-inventory'>
        <Box sx={{ minWidth: 330, maxWidth: 330, marginRight:3 }}>
            <FormControl fullWidth > 
              <InputLabel id="demo-simple-select-label">Planta</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={floorControl}
                label="Age"
                onChange={ (event)=> setFloorControl(event.target.value )}
              >
                {floors.map((element, index)=>{
                    return <MenuItem value={index}>{element}</MenuItem>
                  })
                  
                }
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 330, maxWidth: 330, marginRight:3}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Aula</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={classroomControl}
                label="Age"
                onChange={ (event)=> setClassroomControl(event.target.value )}
              >
                {classrooms.filter((row)=> floorControl == '' && floorControl != 0? row:(floors[floorControl] === row.Floor)).map((element, index)=>{
                    return <MenuItem value={element.Classroom_id}>{element.Floor}.{element.Number}</MenuItem>
                  })
                  
                }
              </Select>
            </FormControl>
          </Box>
          <button className='bt-add-default' onClick={handleClearControl}>LIMPIAR</button>
        </div>
          <TableContainer component={Paper} sx={{ minWidth: 150, align:"center"}} >
              <Table sx={{ }} aria-label="simple table" align="center">
                  <TableHead>
                  <TableRow style={{ backgroundColor: '#eeeeee', height:'20px'}}>
                      <TableCell width="10px" style={{fontFamily:'Open Sans', fontSize:'16px'}} >Nº</TableCell>
                      <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Ordenador</TableCell>
                      <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Ítem</TableCell>
                      <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Tipo</TableCell>
                      <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Cantidad</TableCell>                      
                      <TableCell width="100px" align="center" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Acciones</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {inventory.length == 0 ?  <TableCell align="center"></TableCell>
                  :    
                  (rowsPerPage > 0
                      ? inventory.filter((element)=> classroomControl == ''? element:  (element.Classroom_id == classroomControl)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : inventory.filter((element)=> classroomControl == ''? element:  (element.Classroom_id == classroomControl)))
                      .map((row, index) => {
                      return(
                      <TableRow key={index} style={{height:'20px'}}>  
                          <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{index+1}</TableCell>
                          <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.computer.Name}</TableCell>
                          <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.tb_tool.Name}</TableCell>
                          <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.tb_tool.Type}</TableCell>
                          <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.Amount}</TableCell>
                          <TableCell align="center"><EditIcon className='icon-edit' onClick={ ()=>handleCreateEditInventory(row)} /><DeleteIcon className='icon-delete' onClick={()=>handleDeleteInventory(row)}/></TableCell>
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
                      count={inventory.filter((element)=> classroomControl == ''? element:  (element.Classroom_id == classroomControl)).length}
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
      {openModalCreateEdit && <ModalCreateInventory openModal={setOpenModalCreateEdit} inventory={Object.keys(currentInventory).length === 0 ? null:currentInventory} responseOk={setOkResponse} responseError={setErrorResponse}/>}
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

export default InventoryGeneral