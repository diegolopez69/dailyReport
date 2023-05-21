import React, {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useInventory } from '../../hooks/inventory/useInventory';
import ModalCreateInventory from './ModalCreateInventory';
//hook inventory con filtro aulas
//table
const ModalByClassroom =({openModal, classroom})=> {
    // classroom.Classroom_id
    const [currentClassroom, setCurrentClassroom] = useState({});
    const [openModalAddItems, setOpenModalAddItems] = useState(false);
    const {inventory, createInventory, deleteInventoryById} =useInventory();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const deleteInventory = (inventory)=>{
        deleteInventoryById(inventory)
    }
  return (
    <>
        <div className="modalBackground-inventory-especific">
            <div className="modalContainer-inventory-especific">
                <div className="header-modal">
                <button className="bt-close" onClick={()=> openModal(false)}>X</button>
                </div>
                <div className='tittle-header-modal-inventory'>
                    <h5>Aula: {classroom.Floor}.{classroom.Number}</h5>
                    <hr></hr>
                </div>
                <div className='container-header-bt-add'>
                    <button className='bt-add-modal' onClick={()=> setOpenModalAddItems(true)}>Añadir Ítems</button>
                </div>                
                <div className="body-add-edit">
                    <TableContainer component={Paper} sx={{ minWidth: 150, align:"center"}} >
                        <Table sx={{ minWidth: 150, maxWidth: 1000}} aria-label="simple table" align="center">
                            <TableHead >
                            <TableRow>
                                <TableCell width="70px" height="80px"> Nº</TableCell>
                                <TableCell width="100px" align="center">Ordenador</TableCell>
                                <TableCell  width="100px" align="center">Ítem</TableCell>
                                <TableCell  width="100px" align="center">Tipo</TableCell>
                                <TableCell  width="100px" align="center">Acciones</TableCell>
                            </TableRow>
                            </TableHead>

                            <TableBody>
                            {(rowsPerPage > 0
                                ? inventory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : inventory)
                                .map((row, index) => (
                                <TableRow
                                key={index}
                                >
                                <TableCell>
                                    {row.Inventory_id}
                                </TableCell>
                                <TableCell align="center">{row.computer.Name}</TableCell>
                                <TableCell align="center">{row.tb_tool.Name}</TableCell>
                                <TableCell align="center">{row.tb_tool.Type}</TableCell>
                                <TableCell align="center"><button><DeleteIcon className='icon-delete' onClick={()=>deleteInventory(row)}/></button></TableCell>
                                
                                </TableRow>
                            ))}
                            </TableBody> 
                            <TableFooter >
                                <TableRow >  
                                <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                count={0}
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
        </div>
        {openModalAddItems && <ModalCreateInventory openModal={setOpenModalAddItems} classroom={classroom}/>}
    </>
  )
}

export default ModalByClassroom