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
import AddIcon from '@mui/icons-material/Add';
import '../../assets/css/classroom/index.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { floors } from './default-data';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { element } from 'prop-types';
const Classrooms =()=> {
  const{classrooms, deleteClassroomById} = useClassrooms();
  const [page, setPage] = React.useState(0);
  const [openModalCreateEdit, setOpenModalCreateEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [currentClassroom, setCurrentClassroom] = useState({});
  const [openOkResponse, setOkResponse] =useState(false);
  const [openErrorResponse, setErrorResponse] =useState(false);
  const [deleteClassroomOk, setDeleteClassroomOk] =useState(false);
  const [deleteClassroomError, setDeleteClassroomError] = useState(false);
  const [floorControl, setFloorControl] = useState('')
  const [classroomControl, setClassroomControl] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleCloseOk = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setDeleteClassroomOk(false);
    setOkResponse(false);
  };
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setErrorResponse(false);
    setDeleteClassroomError(false)
  };
  const editClassroom =( classroom )=>{
    setCurrentClassroom(classroom)
    setOpenModalCreateEdit(true)
  }
  const createClassroom =(  )=>{
    setCurrentClassroom({})
    setOpenModalCreateEdit(true)
  }
  const handleDeleteClassroom = async(classroom)=>{
    const result = await deleteClassroomById(classroom);
    if(result ==200){
        setDeleteClassroomOk(true)
        setOkResponse(true)
    }else{            
        setDeleteClassroomError(true)
        setErrorResponse(true)
    }
  }
  const handleClearControl =()=>{
    setFloorControl('')
    setClassroomControl('')
  } 
  return (
    <>
      <div>
      <div className='div-container-title-addbt'>
        <h5 className='tittle-page'>Aulas</h5>
        <button className='bt-add-default' onClick={createClassroom}><AddIcon className='icon-add-default'/> NUEVA</button>
      </div>
      <div className='container-table-classrooms'>
        <div className='container-control-classroom-principal'>
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
          <button className='bt-add-default' style={{marginTop:1, marginLeft:20, marginRight:4}} onClick={handleClearControl}>LIMPIAR</button>
        </div>
        <TableContainer component={Paper} sx={{ minWidth: 150, align:"center"}} >
          <Table sx={{ }} aria-label="simple table" align="center">
              <TableHead>
              <TableRow style={{ backgroundColor: '#eeeeee', height:'20px'}}>
                  <TableCell width="10px" style={{fontFamily:'Open Sans', fontSize:'16px'}} >Nº</TableCell>
                  <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Planta</TableCell>
                  <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Número</TableCell>
                  <TableCell width="100px" align="center" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Acciones</TableCell>
              </TableRow>
              </TableHead>

              <TableBody>
              {classrooms.length == 0 ?  <TableCell align="center"></TableCell>
              :    
              (rowsPerPage> 0
                  ? classrooms
                    .filter((x)=> floorControl == '' && floorControl !==0? element:  (floors[floorControl] === x.Floor))
                    .filter((element)=> classroomControl == ''? element:  (element.Classroom_id == classroomControl))
                    .slice(page * rowsPerPage, page* rowsPerPage + rowsPerPage)
                  : classrooms
                    .filter((x)=> floorControl == '' && floorControl !== 0? element:  (floors[floorControl] === x.Floor))
                    .filter((element)=> classroomControl == ''? element:  (element.Classroom_id == classroomControl)))
                  .map((row, index) => {
                  return(
                  <TableRow key={index} style={{height:'20px'}}>  
                      <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{index}</TableCell>
                      <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.Floor}</TableCell>
                      <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.Number}</TableCell>
                      <TableCell align="center"><EditIcon className='icon-edit'  onClick={()=>editClassroom(row)}/><DeleteIcon className='icon-delete' onClick={()=>handleDeleteClassroom(row)}/></TableCell>
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
                  count={classrooms.filter((x)=> floorControl == '' && floorControl !==0? element:  (floors[floorControl] === x.Floor)).filter((element)=> classroomControl == ''? element:  (element.Classroom_id == classroomControl)).length}
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
    {openModalCreateEdit && <ModalCreateEditClassroom openModal={setOpenModalCreateEdit} classroom={Object.keys(currentClassroom).length === 0 ? null: currentClassroom} responseOk={setOkResponse} responseError={setErrorResponse}/>}
    {openModalDelete && <ModalDeleteClassroom openModal={setOpenModalDelete} classroom={currentClassroom}/>}
    <Snackbar open={openOkResponse} autoHideDuration={2000} onClose={handleCloseOk}>
        <MuiAlert onClose={handleCloseOk} severity="success" sx={{ width: '100%' }}>
            {deleteClassroomOk? "Se eliminó correctamente": "Se guardó correctamente!!"}
        </MuiAlert>
    </Snackbar>
    <Snackbar open={openErrorResponse} autoHideDuration={2000} onClose={handleCloseError}>
        <MuiAlert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {deleteClassroomError? "Error al eliminar el item, inténtalo más tarde": "Error al guardar el Ítem, inténtalo más tarde"}
        </MuiAlert>
    </Snackbar>
    </>
  )
}

export default Classrooms