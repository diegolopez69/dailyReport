import React, {useState, useCallback, useRef} from 'react'
import { Row, Col, Tabs, Tab } from 'react-bootstrap'
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
import ModalCreateEditItem from './ModalCreateEditItem'
const Items = props => {
    const gridRef = useRef();
    const { dataSoftware, dataHardware } = useItems();    
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalCreateEdit, setOpenModalCreateEdit ]= useState(false);
    const [currentItem, setCurrentItem] = useState({});

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


    const editItem =( item )=>{
        setCurrentItem(item)
        setOpenModalCreateEdit(true)
    }
    const createItem =( item )=>{
        setCurrentItem({})
        setOpenModalCreateEdit(true)
    }
    const deleteItem = (item)=>{
        setCurrentItem(item)
        setOpenModalDelete(true)
    }
    return (
        <>
        <Aux>
            <Row>
                <Col>
                    <h5>Inventory</h5>
                    <hr />
                    <div className='header-container-inventory'>
                        <button className='bt-add-modal' onClick={()=>  createItem()}>Nueva Herramienta</button>
                    </div>
                    <Tabs variant='pills' defaultActiveKey='hardware' className='mb-3'>
                        <Tab eventKey='hardware' title='Hardware'>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 150, maxWidth: 900}} aria-label="simple table" align="center">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell width="70px" height="80px">Nº</TableCell>
                                        <TableCell width="100px" height="80px"  align="center">Tipo</TableCell>
                                        <TableCell width="100px" height="80px"  align="center">Nombre</TableCell>
                                        <TableCell width="100px" height="80px"  align="center">Acciones</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {dataHardware.map((row, index) => (
                                        <TableRow
                                        key={index}
                                        >
                                        <TableCell>
                                            {row.Tool_id}
                                        </TableCell>
                                        <TableCell align="center">{row.Type}</TableCell>
                                        <TableCell align="center">{row.Name}</TableCell>
                                        <TableCell align="center"><EditIcon className='icon-edit'  onClick={()=>editItem(row)}/><DeleteIcon className='icon-delete' onClick={()=>deleteItem(row)}/></TableCell>
                                        
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                    <TableFooter >
                                        <TableRow >  
                                        <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, 100]}
                                        count={dataHardware.length}
                                        rowsPerPage={rowsPerPageHardware}
                                        page={pageHardware}
                                        onPageChange={handleChangePageHardware}
                                        onRowsPerPageChange={handleChangeRowsPerPageHardware}
                                        labelRowsPerPage='Fila por pagina'
                                        labelDisplayedRows={({ from, to, count }) => `Mostrando ${from} al ${to} de ${count} elementos`}
                                        style={{ justifyContent: 'center'}}
                                        />
                                        </TableRow>
                                    </TableFooter> 
                                </Table>

                            </TableContainer>
                                                     
                        </Tab>
                        <Tab eventKey='software' title='Software'>
                        <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 150, maxWidth: 900}} aria-label="simple table" align="center">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell width="70px" height="80px">Nº</TableCell>
                                        <TableCell  width="100px" height="80px"  align="center">Tipo</TableCell>
                                        <TableCell width="100px" align="center">Nombre</TableCell>
                                        <TableCell width="100px" align="center">Acciones</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {dataSoftware.map((row, index) => (
                                        <TableRow
                                        key={index}
                                        >
                                        <TableCell align='left'>
                                            {row.Tool_id}
                                        </TableCell>
                                        <TableCell align="center">{row.Type}</TableCell>
                                        <TableCell align="center">{row.Name}</TableCell>
                                        <TableCell align="center"><EditIcon className='icon-edit'  onClick={()=>editItem(row)}/><DeleteIcon className='icon-delete' onClick={()=>deleteItem(row)}/></TableCell>
                                        
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                    <TableFooter >
                                        <TableRow >  
                                        <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, 100]}
                                        count={dataSoftware.length}
                                        rowsPerPage={rowsPerPageSoftware}
                                        page={pageSoftware}
                                        onPageChange={handleChangePageSoftware}
                                        onRowsPerPageChange={handleChangeRowsPerPageSoftware}
                                        labelRowsPerPage='Fila por pagina'
                                        labelDisplayedRows={({ from, to, count }) => `Mostrando ${from} al ${to} de ${count} elementos`}
                                        style={{ justifyContent: 'center'}}
                                        />
                                        </TableRow>
                                    </TableFooter> 
                                </Table>

                            </TableContainer>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Aux>
        
        {/* modals */}
        {openModalDelete && <ModalDeleteItem openModal={setOpenModalDelete} item={currentItem}/>}
        {openModalCreateEdit && <ModalCreateEditItem openModal={setOpenModalCreateEdit} item={ Object.keys(currentItem).length === 0 ? null: currentItem}/>}

        </>
        

    )
}

export default Items
