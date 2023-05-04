import React, {useState, useCallback, useRef} from 'react'
import { Row, Col, Tabs, Tab } from 'react-bootstrap'
import "../../assets/css/inventory/index.css"
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
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDeleteItem from './ModalDeleteItem'
import ModalCreateEditItem from './ModalCreateEditItem'
const Inventory = props => {
    const gridRef = useRef();
    const { dataSoftware, dataHardware } = useItems();    
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalCreateEdit, setOpenModalCreateEdit ]= useState(false);
    const [currentItem, setCurrentItem] = useState({});

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
                    <h5>Inventory Basic Type</h5>
                    <hr />
                    <div className='header-container-inventory'>
                        <button className='bt-add-inventory' onClick={()=>  createItem()}>Nueva Herramienta</button>
                    </div>
                    <Tabs variant='pills' defaultActiveKey='hardware' className='mb-3'>
                        <Tab eventKey='hardware' title='Hardware'>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Nº</TableCell>
                                        <TableCell align="right">Type</TableCell>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">Acciones</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {dataHardware.map((row, index) => (
                                        <TableRow
                                        key={row.Tool_id}
                                        >
                                        <TableCell component="th" scope="row">
                                            {index}
                                        </TableCell>
                                        <TableCell align="right">{row.Type}</TableCell>
                                        <TableCell align="right">{row.Name}</TableCell>
                                        <TableCell align="right"><EditIcon className='icon-edit'  onClick={()=>editItem(row)}/><DeleteIcon className='icon-delete' onClick={()=>deleteItem(row)}/></TableCell>
                                        
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>

                            </TableContainer>
                                                     
                        </Tab>
                        <Tab eventKey='software' title='Software'>
                        <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Nº</TableCell>
                                        <TableCell align="right">Type</TableCell>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">Acciones</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {dataSoftware.map((row, index) => (
                                        <TableRow
                                        key={row.Tool_id}
                                        >
                                        <TableCell component="th" scope="row">
                                            {index}
                                        </TableCell>
                                        <TableCell align="right">{row.Type}</TableCell>
                                        <TableCell align="right">{row.Name}</TableCell>
                                        <TableCell align="right"><EditIcon className='icon-edit'  onClick={()=>editItem(row)}/><DeleteIcon className='icon-delete' onClick={()=>deleteItem(row)}/></TableCell>
                                        
                                        </TableRow>
                                    ))}
                                    </TableBody>
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

export default Inventory
