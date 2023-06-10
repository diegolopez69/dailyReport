import React, {useState, useCallback, useRef} from 'react'
import "../../assets/css/items/index.css"
import Aux from '../../hooks/_Aux'
import { useItems } from '../../hooks/items'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDeleteItem from './ModalDeleteItem'
import { TableFooter } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import TabPanel from '@mui/lab/TabPanel';
import AddIcon from '@mui/icons-material/Add';
import ModalCreateEditItem from './ModalCreateEditItem'
const Items = props => {
    const gridRef = useRef();
    
    const [openOkResponse, setOkResponse] =useState(false);
    const [openErrorResponse, setErrorResponse] =useState(false);
    const { dataSoftware, dataHardware, deleteItemById} = useItems();    
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalCreateEdit, setOpenModalCreateEdit ]= useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const [valueTab, setValueTab] = React.useState('1');
    const [deleteItemOk, setDeleteItemOk] =useState(false);
    const [deleteItemError, setDeleteItemError] = useState(false);
    const [pageSoftware, setPageSoftware] = useState(0);
    const [rowsPerPageSoftware, setRowsPerPageSoftware] = useState(5);
    const handleChangePageSoftware = (event, newPage) => {
        setPageSoftware(newPage);
    };
    const handleChangeRowsPerPageSoftware = (event) => {
        setRowsPerPageSoftware(parseInt(event.target.value, 10));
        setPageSoftware(0);
    };

    const [pageHardware, setPageHardware] = useState(0);
    const [rowsPerPageHardware, setRowsPerPageHardware] = useState(5);
    const handleChangePageHardware = (event, newPage) => {
        setPageHardware(newPage);
    };
    const handleChangeRowsPerPageHardware = (event) => {
        setRowsPerPageHardware(parseInt(event.target.value, 10));
        setPageHardware(0);
    };
    const handleChangeTab = (value, newValue)=>{
        setValueTab(newValue)
    }
    const handleCloseOk = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setDeleteItemOk(false);
        setOkResponse(false);
    };
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorResponse(false);
        setDeleteItemError(false)
    };
    const editItem =( item )=>{
        setCurrentItem(item)
        setOpenModalCreateEdit(true)
    }
    const createItem =( item )=>{
        setCurrentItem({})
        setOpenModalCreateEdit(true)
    }
    const deleteItem = async(item)=>{

        const result = await deleteItemById(item);
        console.log(result)
        if(result ==200){
            setDeleteItemOk(true)
            setOkResponse(true)
        }else{            
            setDeleteItemError(true)
            setErrorResponse(true)
        }
    }
    return (
        <>
      <div className='div-container-title-addbt'>
        <h5 className='tittle-page'>Inventario</h5>
        <button className='bt-add-default' onClick={createItem}><AddIcon className='icon-add-default'/> NUEVA</button>
      </div>
      <div className='body-inventory'>
        <div className='tables-type-inventory-body'>
            <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                    <Tab label="Hardware" value="1" />
                    <Tab label="Software" value="2" />
                </TabList>
                </Box>                
                <div className='container-table-hardware'>
                <TabPanel value="1">
                        <TableContainer component={Paper} sx={{ minWidth: 150, align:"center"}} >
                            <Table sx={{ }} aria-label="simple table" align="center">
                                <TableHead>
                                <TableRow style={{ backgroundColor: '#eeeeee', height:'20px'}}>
                                    <TableCell width="10px" style={{fontFamily:'Open Sans', fontSize:'16px'}} >Nº</TableCell>
                                    <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Nombre</TableCell>
                                    <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Tipo</TableCell>
                                    <TableCell width="100px" align="center" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Acciones</TableCell>
                                </TableRow>
                                </TableHead>

                                <TableBody>
                                {dataHardware.length == 0 ?  ""
                                :    
                                (rowsPerPageHardware > 0
                                    ? dataHardware.slice(pageHardware * rowsPerPageHardware, pageHardware * rowsPerPageHardware + rowsPerPageHardware)
                                    : dataHardware)
                                    .map((row, index) => {
                                    return(
                                    <TableRow key={index} style={{height:'20px'}}>  
                                        <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{index}</TableCell>
                                        <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.Name}</TableCell>
                                        <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.Type}</TableCell>
                                        <TableCell align="center"><EditIcon className='icon-edit'  onClick={()=>editItem(row)}/><DeleteIcon className='icon-delete' onClick={()=>deleteItem(row)}/></TableCell>
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
                                    count={0}
                                    rowsPerPage={rowsPerPageHardware}
                                    page={pageHardware}
                                    onPageChange={handleChangePageHardware}
                                    onRowsPerPageChange={handleChangeRowsPerPageHardware}
                                    labelRowsPerPage='Fila por páginas'
                                    labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count}`}
                                    style={{ justifyContent: 'center'}}
                                    />
                                    </TableRow>
                                </TableFooter>            
                            </Table>          
                        </TableContainer> 
                </TabPanel>
                </div>
                <div className='container-table-software'>
                <TabPanel value="2">
                        <TableContainer component={Paper} sx={{ minWidth: 150, align:"center"}} >
                            <Table sx={{ }} aria-label="simple table" align="center">
                                <TableHead>
                                <TableRow style={{ backgroundColor: '#eeeeee', height:'20px'}}>
                                    <TableCell width="10px" style={{fontFamily:'Open Sans', fontSize:'16px'}} >Nº</TableCell>
                                    <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Nombre</TableCell>
                                    <TableCell width="70px" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Tipo</TableCell>
                                    <TableCell width="100px" align="center" style={{fontFamily:'Open Sans', fontSize:'16px'}}>Acciones</TableCell>
                                </TableRow>
                                </TableHead>

                                <TableBody>
                                {dataSoftware.length == 0 ?  <TableCell align="center"></TableCell>
                                :    
                                (rowsPerPageSoftware > 0
                                    ? dataSoftware.slice(pageSoftware * rowsPerPageSoftware, pageSoftware * rowsPerPageSoftware + rowsPerPageSoftware)
                                    : dataSoftware)
                                    .map((row, index) => {
                                    return(
                                    <TableRow key={index} style={{height:'20px'}}>  
                                        <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{index}</TableCell>
                                        <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.Name}</TableCell>
                                        <TableCell style={{fontFamily:'Open Sans', fontSize:'14px'}}>{row.Type}</TableCell>
                                        <TableCell align="center"><EditIcon className='icon-edit'  onClick={()=>editItem(row)}/><DeleteIcon className='icon-delete' onClick={()=>deleteItem(row)}/></TableCell>
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
                                    count={0}
                                    rowsPerPage={rowsPerPageSoftware}
                                    page={pageSoftware}
                                    onPageChange={handleChangePageSoftware}
                                    onRowsPerPageChange={handleChangeRowsPerPageSoftware}
                                    labelRowsPerPage='Fila por páginas'
                                    labelDisplayedRows={({ from, to, count }) => `${from} - ${to} de ${count}`}
                                    style={{ justifyContent: 'center'}}
                                    />
                                    </TableRow>
                                </TableFooter>            
                            </Table>          
                        </TableContainer> 
                </TabPanel>
                </div>
            </TabContext>
            </Box>
        </div>
      </div>
    {openModalCreateEdit && <ModalCreateEditItem openModal={setOpenModalCreateEdit} item={ Object.keys(currentItem).length === 0 ? null: currentItem} responseOk={setOkResponse} responseError={setErrorResponse}/>}
    <Snackbar open={openOkResponse} autoHideDuration={2000} onClose={handleCloseOk}>
        <MuiAlert onClose={handleCloseOk} severity="success" sx={{ width: '100%' }}>
            {deleteItemOk? "Se eliminó correctamente": "Se guardó correctamente!!"}
        </MuiAlert>
    </Snackbar>
    <Snackbar open={openErrorResponse} autoHideDuration={2000} onClose={handleCloseError}>
        <MuiAlert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
            {deleteItemError? "Error al eliminar el item, inténtalo más tarde": "Error al guardar el Ítem, inténtalo más tarde"}
        </MuiAlert>
    </Snackbar>
    </>
        

    )
}

export default Items
