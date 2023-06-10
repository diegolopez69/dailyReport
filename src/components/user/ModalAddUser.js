import React, { useState } from "react";
import "../../assets/css/modalAddUser.css"
import { useUser } from "../../hooks/user/useUser";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { IconButton } from "rsuite";

const ModalAddUser =({ openModal, method, user, openSuccessResponse, openErrorResponse, userExist })=>{
    const [username, setUsername] = useState( user? user.username: "");
    const [email, setEmail] = useState(user ? user.email:"")
    const [password, setPassword] = useState("")
    const [rol, setRol] =useState(user? user.roles.length ==3? "admin": user.roles.length == 2?"moderator":"user":"user")
    const [showPassword, setShowPassword] = useState(false)
    const {createUser, editUserById } = useUser();
    const [fieldRequired, setFieldRequired] = useState(false);
    const handlerCreateUser = async ()=>{
        if(username != '' && email.includes('@') && password != ''){
            if(method == 'create'){
                const data = {            
                    username: username,
                    email: email,
                    password:password,
                    roles:rol === "admin" ? ["user", "moderator", "admin"]: (rol == "moderator"?  ["user", "moderator"]:["user"] )
                }
                const result = await createUser(data);
                if(result == 200){
                    openSuccessResponse(true)
                    openModal(false)
                }else if(result.includes('400')){
                    userExist(true)
                    openErrorResponse(true)
                }
                else{
                    openErrorResponse(true)
                }
            }else{
                const data = {  
                    id: user.id,          
                    username: username,
                    email: email,
                    password:password,
                    roles:rol === "admin" ? ["user", "moderator", "admin"]: (rol == "moderator"?  ["user", "moderator"]:["user"] )
                }
                const result = await editUserById(data)
                if(result == 200){
                    openSuccessResponse(true)
                    openModal(false)
                }
                else{
                    openErrorResponse(true)
                }
            }
            
        }else{
            setFieldRequired(true)
            setTimeout(() => {
                setFieldRequired(false)
            }, 4000);
        }
        
    }
    return(
        <div className="modalBackground-add">
            <div className="modalContainer-add">
                <div className='tittle-header-modal-revision'>
                    <h5>{method === 'create'? "Nuevo Usuario" : "Usuario"} </h5>
                    <br></br>
                </div>
                {/* {console.log(user.roles.length) } */}
                <div className="body-user-add">
                <div className='container-control-user'>
                    <Box sx={{ minWidth: 460, maxWidth: 460, marginTop:2, marginBottom:7 }}>
                    <FormControl fullWidth > 
                        <TextField 
                            sx={{ minWidth:460, textAlign:'left', maxHeight:10}}
                                id="outlined-required"
                                type='text'
                                label="Nombre"
                                defaultValue={username}
                                onChange={(event)=>setUsername(event.target.value)}
                        />                        
                    </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 460, maxWidth: 460, marginRight:3}}>
                    <FormControl fullWidth>
                        <TextField 
                            sx={{ minWidth:430, textAlign:'left', maxHeight:10, marginBottom:8.5}}
                                id="outlined-required"
                                label="Correo Electronico"
                                type='email'
                                defaultValue={email}
                                onChange={(event)=>setEmail(event.target.value)}
                        />
                    </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 500, maxWidth: 5000, marginBottom: 9}} className='input-revision-especific'>
                        <TextField 
                            sx={{ minWidth:460, textAlign:'left', maxHeight:10}}
                                id="outlined-required"
                                label={user? "Nueva contraseña":"Contraseña"}
                                type={showPassword? 'text':'password'}
                                onChange={(event)=> setPassword(event.target.value)}
                                InputProps={{
                                endAdornment: <InputAdornment 
                                    ><IconButton className="container-button-icon-sp" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<VisibilityRoundedIcon className="icon-show-password"/> :<VisibilityOffRoundedIcon className="icon-show-password"/> }</IconButton></InputAdornment>,
                                }}
                        />
                    </Box>
                    <Box sx={{ minWidth: 400, maxWidth: 400}} className='input-revision-especific'>
                        <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={rol}
                        onChange={ (event)=> setRol(event.target.value)}
                        >
                            <MenuItem value="user">Usuario</MenuItem>                            
                            <MenuItem value="moderator">Moderador</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </Box>
                </div>
                <div className="fieldRequired-add-user">{fieldRequired? "Completa correctamente todos los campos":""}</div>
                </div>
                <div className="footer">
                    <button className="bt-close-modal-create" onClick={()=> openModal(false)}>CERRAR</button>
                    <button className="bt-save-modal-create" onClick={handlerCreateUser} type="submit" >GUARDAR</button>
                </div>
            </div>
        </div>
    )
}
export default ModalAddUser