import React, {useState, useEffect, useRef, SyntheticEvent, Event} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, TablePagination } from '@mui/material';
import { useInventory } from '../../hooks/inventory/useInventory';
import Checkbox from '@mui/material/Checkbox';
import { useRevision } from '../../hooks/revision/useRevision';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useClassrooms } from '../../hooks/classrooms/useClassrooms';
import { floors } from './default-data';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import moment from 'moment';
import '../../assets/css/revision/modalCreateRevision.css';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
const ModalAddRevision =({openModal})=> {
    const now = moment();
    const {classrooms} = useClassrooms();    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { createRevision } = useRevision();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const {inventory} =useInventory();
    const [dataRevision, setDataRevision] = useState([]);
    const previousInventoryRef = useRef([]);
    const [openOkResponse, setOkResponse] =useState(false);
    const [openErrorResponse, setErrorResponse] =useState(false);
    const [warningSaveRevision, setWarningSaveRevision] = useState(-1);
    //control useStates
    const [floorControl, setFloorControl] = useState('');
    const [classroomControl, setClassroomControl] = useState('');
    const [weekControl, setWeekControl] =useState(null);

    const handleClickOkAlert= () => {
        setOkResponse(true);
    };
    const handleClickErrorAlert = () => {
        setErrorResponse(true);
    };
    const AlertResponse = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorResponse(false);
        setOkResponse(false);
    };

    useEffect(() => {
        if (inventory.length > 0 && !arraysAreEqual(inventory, previousInventoryRef.current)) {
            console.log(inventory)
        const revisedData = inventory.map((element) => ({
            Comments: "",
            there_is: 0,
            Works: 0,
            Theoretical_amount: parseInt(element.Amount),
            Actual_amount: element.tb_tool.Type =='Software'? 1:0,
            Inventory_id: element.Inventory_id,
            Classroom_id: parseInt(element.Classroom_id),
            Computer_name: element.computer.Name,
            Tool_name: element.tb_tool.Name,
            Tool_type: element.tb_tool.Type
        }));

        setDataRevision(revisedData);
        previousInventoryRef.current = inventory;
        }
    }, [inventory]);

    const handleCheckboxClick = (event, rowId, numberCheckBox) => {
        const isChecked = event.target.checked;
        const updatedRows = dataRevision.map(row => {
          if (row.Inventory_id === rowId) {
                if(numberCheckBox == 1){
                    if(isChecked){
                        return {
                            ...row,
                            there_is: isChecked == true? 1:0
                          };
                    }else{
                        return {
                            ...row,
                            Works: 0,
                            there_is: 0,
                            Comments:"",
                            Actual_amount:0
                          };
                    }
                }else{
                    return {
                        ...row,
                        Works: isChecked == true? 1:0
                      };
                }    
          }
          return row;
        });
        setDataRevision(updatedRows)
    };
    const handleCommentsClick = (event, rowId) => {
        const valueComment = event.target.value;
        const updatedRows = dataRevision.map(row => {
          if (row.Inventory_id === rowId) {
            
            return {
                ...row,
                Comments: valueComment
                };
            
          }
          return row;
        });
        setDataRevision(updatedRows)
    };
    const handleCurrentAmountClick = (event, rowId) => {
        const valueAmount = event.target.value;
        const updatedRows = dataRevision.map(row => {
          if (row.Inventory_id === rowId) {
            
            return {
                ...row,
                Actual_amount: valueAmount
                };
          }
          return row;
        });
        setDataRevision(updatedRows)
    };
    const handlerSaveRevision = async()=>{
        // setWarningSaveRevision
        if(dataRevision.filter((dataRow)=> dataRow.Classroom_id == (classroomControl != ''? classroomControl: null)).length == 0){
            setWarningSaveRevision(1)
            setTimeout(() => {
                setWarningSaveRevision(-1)
              }, 3000);
        }else if(classroomControl === '' || floorControl === ''){
            console.log("FILTROS VACIOS")
            setWarningSaveRevision(0)
            setTimeout(() => {
                setWarningSaveRevision(-1)
              }, 3000);
        }else{
            console.log(dataRevision.filter((dataRow)=> dataRow.Classroom_id == (classroomControl != '' || classroomControl == 0? classroomControl: null)))
            const result = await createRevision(dataRevision.filter((dataRow)=> dataRow.Classroom_id == (classroomControl != '' || classroomControl == 0? classroomControl: null)));
            if(result[result.length-1] == 201){
                setOkResponse(true)
                setTimeout(() => {
                    setOkResponse(false)
                }, 3000);
            }else{
                setErrorResponse(true)
                setTimeout(() => {
                    setErrorResponse(false)
                }, 3000);
            }
        }
        // openModal(false)x
    }
    const handleClearControl = ()=>{
        setClassroomControl('')
        setFloorControl('')
    }
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  return (
    <>
        <div className="modalBackground-revision-especific">
            <div className="modalContainer-inventory-especific">
                <div className='tittle-header-modal-revision'>
                    <h5>Revisión</h5>
                    <br></br>
                </div>
                <div className='container-header-bt-add'>
                </div>                
                <div className="body-add-edit-revision">
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
                        {classrooms.filter((row)=> (floorControl == '' && floorControl != 0? row: floors[floorControl] == row.Floor )).map((element, index)=>{
                            return <MenuItem value={element.Classroom_id}>{element.Floor}.{element.Number}</MenuItem>
                            })
                            
                        }
                        </Select>
                    </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 360, maxWidth: 330}} className='input-revision-especific'>
                    <TextField 
                        sx={{ minWidth:330, textAlign:'left', maxHeight:10}}
                            InputProps={{
                            endAdornment: <InputAdornment 
                                ><CalendarMonthIcon/></InputAdornment>,
                            }}
                            id="outlined-required"
                            label="Semana"
                            type='number'
                            disabled
                            defaultValue={now.week()}
                        />
                    </Box>
                    <button className='bt-add-default' onClick={handleClearControl}>LIMPIAR</button>
                </div>
                <div className='table-body-new-revision'>
                <TableContainer component={Paper} sx={{ minWidth: 150, align:"center"}} >
                    <Table sx={{ }} aria-label="simple table" align="center">
                        <TableHead>
                        <TableRow style={{ backgroundColor: '#eeeeee', height:'20px'}}>
                            <TableCell width="10px" style={{fontFamily:'Open Sans', fontSize:'16px'}} > Localizado</TableCell>
                            <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}> Ítem</TableCell>
                            <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}> Tipo</TableCell>
                            <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}> Ordenador</TableCell>
                            <TableCell width="100px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Cantidad</TableCell>
                            <TableCell  align='center' width="100px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Operativo</TableCell>
                            <TableCell align='center' width="100px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Comentarios</TableCell>
                        </TableRow>
                        </TableHead>

                        <TableBody>
                        {dataRevision.length == 0 ?  <TableCell align="center">Cargando..</TableCell>
                        :
                        (classroomControl == '' || (floorControl == '' && floorControl != 0))?
                            <>
                            <h5 className='text-to-referenceControl'>  Seleciona la planta y el aula</h5>
                            <WarningAmberRoundedIcon color="secondary"/>
                            </>
                        :
                        (rowsPerPage > 0
                            ? dataRevision.filter((dataRow)=> dataRow.Classroom_id == (classroomControl != '' || classroomControl == 0? classroomControl: null)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : dataRevision.filter((dataRow)=> dataRow.Classroom_id == (classroomControl != '' || classroomControl == 0? classroomControl: null)))
                            .map((row, index) => {
                            return(
                                
                                <TableRow key={index} style={{height:'20px'}}>
                                <TableCell style={{fontFamily:'Open Sans'}}>
                                    <Checkbox {...label} width="70px" color="success" checked={row.there_is} onChange={(event)=>handleCheckboxClick(event, row.Inventory_id, 1)} />
                                </TableCell>                 
                                <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.Tool_name}</TableCell>
                                <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.Tool_type}</TableCell>
                                <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.Computer_name}</TableCell>
                                <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}><input type="number" defaultValue={row.Tool_type == 'Software'? 1: ''} disabled={row.Tool_type == 'Software'? true:false}  className='input-create-revision' onChange={(event)=>handleCurrentAmountClick(event, row.Inventory_id)}/></TableCell>
                                <TableCell align='center' ><Switch checked={row.Works}  disabled={row.there_is? false: true}  onChange={(event)=>handleCheckboxClick(event, row.Inventory_id)} /></TableCell>                                
                                <TableCell align='center' style={{fontFamily:'Open Sans', fontSize:'14px'}}><input type="text" placeholder='Descripción'  className='input-create-comments-revision' onChange={(event)=>handleCommentsClick(event, row.Inventory_id)}/></TableCell>
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
                            count={dataRevision.filter((dataRow)=> dataRow.Classroom_id == (classroomControl != ''? classroomControl: null)).length}
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
                    <div className="footer">
                        <button className="bt-close-modal-create" onClick={()=>openModal(false)}>CERRAR</button>
                        <button className="bt-save-modal-create" onClick={handlerSaveRevision} >GUARDAR</button>
                    </div>
                </div>
            </div>
        </div>
        <Snackbar open={openOkResponse} autoHideDuration={1000} onClose={handleClose}>
            <AlertResponse onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Se guardó correctamente!!
            </AlertResponse>
        </Snackbar>
        <Snackbar open={openErrorResponse} autoHideDuration={1000} onClose={handleClose}>
            <AlertResponse onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                Error al guardar la revisión, intenetelo mas tarde 
            </AlertResponse>
        </Snackbar>
        {warningSaveRevision == 0 ? <Alert severity="error">Selecciona el aula y a planta !!</Alert>:warningSaveRevision==1? <Alert severity="error">No hay datos encontrados!</Alert>:""}
        {/* {openModalAddItems && <ModalCreateInventory openModal={setOpenModalAddItems} classroom={classroom}/>} */}
    </>
  )
}
const arraysAreEqual = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
};

export default ModalAddRevision