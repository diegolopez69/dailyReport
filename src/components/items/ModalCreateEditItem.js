import React, { useState } from "react"
import { useItems } from "../../hooks/items";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
const ModalCreateEditItem =({ openModal, item, responseOk, responseError })=>{
    
    const [currentItem, setCurrentItem] = useState( item? item:{ Type:"Software", Name:""});
    const {editItemById, createItem}  = useItems();
    
    const handlerEditCreateCurrentItem = async( )=>{
        if(item){
            const result = await editItemById(currentItem);
            if(result == 200){
                responseOk(true)
                openModal(false);
            }else{
                responseError(true)
            }
        }else{
            const result = await createItem(currentItem);
            if(result == 201){
                responseOk(true)
                openModal(false);
            }else{
                responseError(true)
            }
        }
    }
    
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className='tittle-header-modal-revision'>
                    <h5 className="title-item-modalCreate">{item?  "Ítem":"Nuevo Ítem"} </h5>
                    <br></br>
                </div>
                <div className="body-add-edit-item">
                    <Box sx={{ minWidth: 460, maxWidth: 460, marginTop:2, marginBottom:7 }}>
                        <FormControl fullWidth > 
                            <TextField 
                                sx={{ minWidth:460, maxWidth: 460, textAlign:'left', maxHeight:10}}
                                    id="outlined-required"
                                    type='text'
                                    label="Nombre"
                                    defaultValue={currentItem.Name}
                                    onChange={(event)=>setCurrentItem({...currentItem, Name:event.target.value})}
                            />                        
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 460, maxWidth: 460, marginTop:2, marginBottom:7 }}>
                    <FormControl fullWidth > 
                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Tipo"
                        defaultValue={currentItem.Type}
                        onChange={ (event)=> setCurrentItem({...currentItem, Type:event.target.value} )}
                        >
                            <MenuItem value="Hardware">Hardware</MenuItem>                            
                            <MenuItem value="Software">Software</MenuItem>
                        </Select>                    
                    </FormControl>
                    </Box>
                </div>
                <div className="footer">
                    <button className="bt-close-modal-create" onClick={()=> openModal(false)}>CERRAR</button>
                    <button className="bt-save-modal-create" onClick={handlerEditCreateCurrentItem}>GUARDAR</button>
                </div>
            </div>
        </div>
    )
}
export default ModalCreateEditItem;