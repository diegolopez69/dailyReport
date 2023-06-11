import React, { useState } from "react"
import { useClassrooms } from "../../hooks/classrooms/useClassrooms";
import '../../assets/css/classroom/modalCreateEdit.css'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
const ModalCreateEditClassroom =({ openModal, classroom ,responseOk, responseError })=>{
    
    const [currentClassroom, setCurrentClassroom] = useState( classroom? classroom:{ Floor:"", Number:""});
    const {editClassroomById, createClassroom}  = useClassrooms();
    
    const handlerEditCreateCurrentClassroom = async( )=>{
        if(classroom){
            const result = await editClassroomById(currentClassroom);
            console.log(currentClassroom);
            console.log(result);
            if(result == 200){
                responseOk(true)
                openModal(false);
            }else{
                responseError(true)
            }
        }else{
            const result = await createClassroom(currentClassroom);
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
                <div className='tittle-header-modal-classroom'>
                    <h5 className="title-item-modalCreate">{classroom?  "Aula":"Nuevo Aula"} </h5>
                    <br></br>
                </div>
                <div className="body-add-edit-classroom">
                    <Box sx={{ minWidth: 460, maxWidth: 460, marginTop:2, marginBottom:7 }}>
                        <FormControl fullWidth > 
                            <TextField 
                                sx={{ minWidth:460, maxWidth: 460, textAlign:'left', maxHeight:10}}
                                    id="outlined-required"
                                    type='number'
                                    label="Planta"
                                    defaultValue={currentClassroom.Floor}
                                    onChange={(event)=>setCurrentClassroom({...currentClassroom, Floor:event.target.value})}
                            />                        
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 460, maxWidth: 460, marginTop:2, marginBottom:9 }}>
                    <FormControl fullWidth > 
                            <TextField 
                                sx={{ minWidth:460, maxWidth: 460, textAlign:'left', maxHeight:10}}
                                    id="outlined-required"
                                    type='number'
                                    label="Número"
                                    defaultValue={currentClassroom.Number}
                                    onChange={(event)=>setCurrentClassroom({...currentClassroom, Number:event.target.value})}
                            />             
                    </FormControl>
                    </Box>
                </div>
                <div className="footer">
                    <button className="bt-close-modal-create" onClick={()=> openModal(false)}>CERRAR</button>
                    <button className="bt-save-modal-create" onClick={handlerEditCreateCurrentClassroom}>GUARDAR</button>
                </div>
            </div>
        </div>
    )
}
export default ModalCreateEditClassroom;