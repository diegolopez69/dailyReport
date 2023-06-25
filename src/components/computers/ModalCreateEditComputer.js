import React, {useState} from 'react'
import { useComputers } from '../../hooks/computers/useComputers'
import '../../assets/css/computer/modalCreateEdit.css'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const ModalCreateEditComputer =({openModal, computer, responseOk, responseError})=> {
    const [currentComputer, setCurrentComputer] = useState( computer? computer:{ Name:"", Serial:""});
    const {editComputerById, createComputer}  = useComputers();
    
    const handlerEditCreateCurrentComputer = async( )=>{
        if(computer){
            const result = await editComputerById(currentComputer);
            if(result == 200){
                responseOk(true)
                openModal(false);
            }else{
                responseError(true)
            }
        }else{
            const result = await createComputer(currentComputer);
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
                <div className='tittle-header-modal-computer'>
                    <h5 className="title-item-modalCreate">{computer?  "Ordenador":"Nuevo Ordenador"} </h5>
                    <br></br>
                </div>
                <div className="body-add-edit-item">
                    <Box sx={{ minWidth: 460, maxWidth: 460, marginTop:2, marginBottom:7 }}>
                        <FormControl fullWidth > 
                            <TextField 
                                sx={{ minWidth:460, maxWidth: 460, textAlign:'left', maxHeight:10, marginTop: 0}}
                                    id="outlined-required"
                                    type='text'
                                    label="Nombre"
                                    defaultValue={currentComputer.Name}
                                    onChange={(event)=>setCurrentComputer({...currentComputer, Name:event.target.value})}
                            />                        
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 460, maxWidth: 460, marginTop:2, marginBottom:8 }}>
                        <FormControl fullWidth > 
                            <TextField 
                                sx={{ minWidth:460, maxWidth: 460, textAlign:'left', maxHeight:10}}
                                    id="outlined-required"
                                    type='text'
                                    label="Serie"
                                    defaultValue={currentComputer.Serie}
                                    onChange={(event)=>setCurrentComputer({...currentComputer, Serie:event.target.value})}
                            />                        
                        </FormControl>
                    </Box>
                </div>
                <div className="footer">
                    <button className="bt-close-modal-create" onClick={()=> openModal(false)}>CERRAR</button>
                    <button className="bt-save-modal-create" onClick={handlerEditCreateCurrentComputer}>GUARDAR</button>
                </div>
            </div>
        </div>
    )
}

export default ModalCreateEditComputer