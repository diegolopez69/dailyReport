import React, {useState, useEffect, useRef} from 'react'
import 'moment/locale/es'; 
import { floors } from './default-data';
import { useClassrooms } from '../../hooks/classrooms/useClassrooms';
import '../../assets/css/inventory/index.css'
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { TableFooter, TablePagination } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import '../../assets/css/revision/index.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useRevision } from '../../hooks/revision/useRevision';
import ModalAddRevision from './ModalAddRevision'
import Switch from '@mui/material/Switch';
const Revision =() => {
  const {classrooms} = useClassrooms();
  const [floorControl, setFloorControl] = useState('');
  const [classroomControl, setClassroomControl] = useState('');
  const [weekControl, setWeekControl] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { revision } = useRevision();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [openModalCreateRevision, setOpenModalCreateRevision] = useState(false);
  const moment = require('moment');
  const currentWeek = moment().week();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClearControl = ()=>{
      setClassroomControl('')
      setFloorControl('')
      setWeekControl('')
  }
  const handlerCreateRevision = ()=>{
    setOpenModalCreateRevision(true)
  }
  return (
    <>
    <div className='div-container-title-addbt'>
      <h5 className='tittle-page'>Revisiones</h5>
      <button className='bt-add-default' onClick={handlerCreateRevision}><AddIcon className='icon-add-default'/> NUEVA</button>
    </div>
    <div className='body-revision'>
      <div className='container-control-revision'>
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
        <Box sx={{ minWidth: 330, maxWidth: 330}}>
          <TextField
          sx={{ minWidth:330}}
            InputProps={{
              endAdornment: <InputAdornment 
                ><CalendarMonthIcon/></InputAdornment>,
            }}
            id="outlined-required"
            label={"Semana " + currentWeek}
            type='number'
            onChange={(event)=>setWeekControl(event.target.value)}
            defaultValue={weekControl}
          />
        </Box>
        <button className='bt-add-default' onClick={handleClearControl}>LIMPIAR</button>
      </div>
      <div className='table-revision-body'>
        <TableContainer component={Paper} sx={{ minWidth: 150, align:"center"}} >
          <Table sx={{ }} aria-label="simple table" align="center">
              <TableHead>
                {/* {console.log(floors[floorControl])} */}
              <TableRow style={{ backgroundColor: '#eeeeee', height:'20px'}}>
                  <TableCell width="10px" style={{fontFamily:'Open Sans', fontSize:'16px'}} > Localizado</TableCell>
                  <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}> Ítem</TableCell>
                  <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}> Tipo</TableCell>
                  <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}> Ordenador</TableCell>
                  <TableCell width="100px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Cantidad</TableCell>
                  <TableCell  width="100px" align="center" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Operativo</TableCell>
              </TableRow>
              </TableHead>

              <TableBody>
              {revision.length == 0 ?  <TableCell align="center">Cargando..</TableCell>
              :    
              (rowsPerPage > 0
                  ? revision
                  .filter((dataRow)=> 
                    floorControl == '' && floorControl !== 0 ?
                      dataRow
                    :(dataRow.dataInventory !== null? 
                      (dataRow.dataInventory.tb_classroom.Floor == floors[floorControl]): null))
                  .filter((dataRow) =>
                  (classroomControl !== '')? 
                  (dataRow.dataInventory !== null ? dataRow.dataInventory.tb_classroom.Classroom_id == classroomControl: null)
                  :dataRow )
                  .filter((y) => weekControl == ''? y : (moment(y.createdAt).week() ==weekControl) )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : revision
                    .filter((dataRow)=> 
                    floorControl == '' && floorControl !== 0 ?
                      dataRow
                    :(dataRow.dataInventory !== null? 
                      (dataRow.dataInventory.tb_classroom.Floor == floors[floorControl]): null))
                    .filter((dataRow) =>
                    (classroomControl !== '')? 
                    (dataRow.dataInventory !== null ? dataRow.dataInventory.tb_classroom.Classroom_id == classroomControl: null)
                    :dataRow)
                    .filter((y) => weekControl == ''? y : (moment(y.createdAt).week ==weekControl) )
                  )     
                  .map((row, index) => {
                        return(
                          
                          <TableRow key={index} style={{height:'20px'}}>
                            <TableCell style={{fontFamily:'Open Sans'}}>
                                <Checkbox {...label} width="70px" color="success" checked={row.there_is} />
                            </TableCell>                      
                            <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.dataInventory? row.dataInventory.tb_tool.Name: ""}</TableCell>
                            <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.dataInventory? row.dataInventory.tb_tool.Type: ""}</TableCell>
                            <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.dataInventory? row.dataInventory.computer.Name: ""}</TableCell>
                            <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>1</TableCell>
                            <TableCell align="center"><Switch checked={row.Works} /></TableCell>                                
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
                  count={revision
                    .filter((dataRow)=> 
                      floorControl == '' && floorControl !== 0 ?
                        dataRow
                      :(dataRow.dataInventory !== null? 
                        (dataRow.dataInventory.tb_classroom.Floor == floors[floorControl]): null))
                    .filter((dataRow) =>
                    (classroomControl !== '')? 
                    (dataRow.dataInventory !== null ? dataRow.dataInventory.tb_classroom.Classroom_id == classroomControl: null)
                    :dataRow ).length}
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
    {openModalCreateRevision && <ModalAddRevision openModal={setOpenModalCreateRevision}/>}
    </>
    
  )
}
const arraysAreEqual = (array1, array2) => {
  return JSON.stringify(array1) === JSON.stringify(array2);
};
export default Revision