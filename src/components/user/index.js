import React, {useEffect, useState} from "react"
import Card from "./Card"
import AddUser from "./AddUser"
import "../../assets/css/user.css"
import AddIcon from '@mui/icons-material/Add';
import { getUsers } from "../../data/user/getUsers"
import SearchIcon from '@mui/icons-material/Search';
import { useUser } from "../../hooks/user/useUser"
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import ModalAddUser from "./ModalAddUser";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useStepContext } from "@mui/material";

const User =()=>{
    const {usersGeneral} = useUser();
    const [methodModal, setMethodModal] = useState('update');
    const[autoRefesh, setAutoRefresh] = useState(true)
    const [dataToSearch, setDataToSearch] = useState(""); 
    const [emailControl, setEmailControl] =useState('')
    const [usernameControl, setUsernameControl] = useState('');
    const [currentUser, setCurrentUser] = useState("");
    const [userExist, setUserExist] = useState(false);
    const [openModalNewUser, setOpenModalNewUser] = useState(false);
    const [openOkResponse, setOkResponse] =useState(false);
    const [openErrorResponse, setErrorResponse] =useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [deleteUserError, setDeleteUserError] = useState(false);
     const handleCreateUser =()=>{
        setMethodModal('create')
        setCurrentUser('')
        setOpenModalNewUser(true)
    }
    const handleCloseOk = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setDeleteUser(false);
        setOkResponse(false);
    };
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setErrorResponse(false);
        setDeleteUserError(false)
    };
    const handleClearControl = ()=>{
        setEmailControl('')
        setUsernameControl('')
    }
    return (
        <>
            <div>
            <div className='div-container-title-addbt'>
                <h5 className='tittle-page'>Usuarios</h5>
                <button className='bt-add-default' onClick={handleCreateUser}><AddIcon className='icon-add-default'/> NUEVA</button>
            </div>
                    {/* <div className="search">
                        <input onChange={(e)=> setDataToSearch(e.target.value) } type="text" placeholder="Buscar usuario"></input>
                        <button><SearchIcon className="icon-search"/></button>
                    </div> */}
                <div className="container-cards-users">
                    <div className='container-control-user-principal'>
                        <Box sx={{ minWidth: 330, maxWidth: 330, marginRight:15, marginTop:2}}>
                        <FormControl fullWidth > 
                            <TextField 
                                sx={{ minWidth:430, textAlign:'left', maxHeight:10, marginBottom:8.5}}
                                    id="outlined-required"
                                    label="Nombre"
                                    value={usernameControl}
                                    onChange={(event)=>setUsernameControl(event.target.value)}
                            />
                        </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 330, maxWidth: 330, marginRight:12, marginTop:2}}>
                        <FormControl fullWidth>
                            <TextField 
                                sx={{ minWidth:430, textAlign:'left', maxHeight:10, marginBottom:8.5}}
                                    id="outlined-required"
                                    label="Correo Electronico"
                                    type='email'
                                    value={emailControl}
                                    onChange={(event)=>setEmailControl(event.target.value)}
                            />
                        </FormControl>
                        </Box>
                        <button className='bt-add-default' style={{marginTop:16, marginLeft:20, marginRight:10 }} onClick={handleClearControl}>LIMPIAR</button>
                    </div>
                    <div className="col-12 row"> 
                        {usersGeneral.length === 0? "..error al cargar los datos": usersGeneral
                        .filter(x => x.username.includes(usernameControl)).filter(y => y.email.includes(emailControl)).map((element)=>{
                            return( <Card key={element.id} data={element} currentUser={setCurrentUser} method={setMethodModal} openModal={setOpenModalNewUser} openOkResponse={setOkResponse} openErrorResponse={setErrorResponse} openDeleteUser={setDeleteUser} openDeleteErrorUser={setDeleteUserError}/>)
                        }) } 
                    </div>  
                </div>                    
            </div>
            {openModalNewUser && <ModalAddUser openModal={setOpenModalNewUser} method={methodModal} user={currentUser} openSuccessResponse={setOkResponse} openErrorResponse={setErrorResponse} userExist={setUserExist}/>}
            <Snackbar open={openOkResponse} autoHideDuration={2000} onClose={handleCloseOk}>
                <MuiAlert onClose={handleCloseOk} severity="success" sx={{ width: '100%' }}>
                    {deleteUser? "Se eliminó correctamente": "Se guardó correctamente!!"} 
                </MuiAlert>
            </Snackbar>
            <Snackbar open={openErrorResponse} autoHideDuration={2000} onClose={handleCloseError}>
                <MuiAlert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {userExist? "Usuario ya existente": deleteUserError? "Error al eliminar el usuario":
                    "Error al guardar el usuario, intenetelo mas tarde "}
                </MuiAlert>
            </Snackbar>
        </>
        
    )
}
export default User;