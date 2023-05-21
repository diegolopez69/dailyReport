import React, {useState, useEffect, useRef} from 'react'
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

const ModalAddRevision =({openModal, classroom})=> {
   
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { createRevision } = useRevision();
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const {inventory} =useInventory();
    const [dataRevision, setDataRevision] = useState([]);
    const previousInventoryRef = useRef([]);

    useEffect(() => {
        if (inventory.length > 0 && !arraysAreEqual(inventory, previousInventoryRef.current)) {
        const revisedData = inventory.map((element) => ({
            Comments: "",
            there_is: 0,
            works: 0,
            Actual_amount: null,
            Inventory_id: element.Inventory_id,
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
                            works: 0,
                            there_is: null,
                            Comments:"",
                            Actual_amount:0
                          };
                    }
                }else{
                    return {
                        ...row,
                        works: isChecked == true? 1:0
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
    const handlerSaveRevision = ()=>{
        const result = createRevision(dataRevision);
        console.log(result);
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
                </div>                
                <div className="body-add-edit">
                    <TableContainer component={Paper} sx={{ minWidth: 150, align:"center"}} >
                        <Table sx={{ minWidth: 150, maxWidth: 1000}} aria-label="simple table" align="center">
                            <TableHead >
                            <TableRow>
                                <TableCell width="70px" height="80px"> Existe</TableCell>
                                <TableCell width="70px" height="80px"> Funciona</TableCell>
                                <TableCell width="70px" height="80px"> Comentario</TableCell>
                                <TableCell width="70px" height="80px"> Cantidad</TableCell>
                                <TableCell width="100px" align="center">Ordenador</TableCell>
                                <TableCell  width="100px" align="center">Ítem</TableCell>
                                <TableCell  width="100px" align="center">Tipo</TableCell>
                            </TableRow>
                            </TableHead>

                            <TableBody>
                            {dataRevision.length == 0 ?  <TableCell align="center">Cargando..</TableCell>
                            :    
                            (rowsPerPage > 0
                                ? dataRevision.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : dataRevision)
                                .map((row, index) => (
                                <TableRow
                                key={index}
                                >
                                <TableCell>
                                    <Checkbox {...label} width="70px" color="success" onChange={(event)=>handleCheckboxClick(event, row.Inventory_id, 1)}/>
                                </TableCell>
                                <TableCell>
                                    <Checkbox checked={row.works === 1? true:false} {...label} color="success" disabled={row.there_is == 0 ? true:false}  onChange={(event)=>handleCheckboxClick(event, row.Inventory_id)}/>
                                </TableCell>
                                <TableCell>
                                    <input type='text' value={row.Comments} placeholder='comentarios' disabled={row.there_is == 0 ? true:false} onChange={(event)=> handleCommentsClick(event, row.Inventory_id)}></input>
                                </TableCell>
                                <TableCell>
                                    <input type='number' value={row.Actual_amount} placeholder='cantidad' disabled={row.there_is == 0 ? true:false} onChange={(event)=> handleCurrentAmountClick(event, row.Inventory_id)} ></input>
                                </TableCell>
                                <TableCell align="center">{row.Computer_name}</TableCell>
                                <TableCell align="center">{row.Tool_name}</TableCell>
                                <TableCell align="center">{row.Tool_type}</TableCell>                                
                                </TableRow>
                            ))
                            }
                            </TableBody> 
                            <TableFooter >
                                <TableRow >  
                                <TablePagination
                                rowsPerPageOptions={[5, 10]}
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
                    <div className="footer">
                        <button className="bt-cancel" onClick={()=> openModal(false)}>Cancelar</button>
                        <button className="bt-edit" onClick={()=>handlerSaveRevision()} >Guardar</button>
                    </div>
                </div>
            </div>
        </div>
        {/* {openModalAddItems && <ModalCreateInventory openModal={setOpenModalAddItems} classroom={classroom}/>} */}
    </>
  )
}
const arraysAreEqual = (array1, array2) => {
    return JSON.stringify(array1) === JSON.stringify(array2);
};

export default ModalAddRevision