import React, { useState } from "react";
import "../../assets/css/modalEdit.css"
import { putUser } from "../../data/user/putUser";
const ModalEdit =({ openModal, data })=>{
    const[username, setUsername] = useState(data.username);
    const[email, setEmail] = useState(data.email);
    const[password, setPassword] = useState(data.password);

    const toEdit =( )=>{
        putUser(data.id, username, email ).then((response)=>{
            console.log("se editó correctamente", response);
        })
        openModal(false)
    }
    return (
        <div className="modalBackground-edit">
            <div className="modalContainer-edit">
                <button className="bt-close-edit" onClick={()=> openModal(false)}>X</button>
                <div className="body-edit">
                    <div className="container-row-1">
                        <h4>Nombre:</h4>
                        <input type="text" defaultValue={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Nombre" required></input>
                    </div>
                    <hr/>
                    <div className="container-row-2">
                        <h4>Email:</h4>
                        <input type="email" defaultValue={email} onChange={(e)=>setEmail( e.target.value ) } placeholder="Email" required></input>
                    </div>
                    <hr/>
                    <div className="container-row-3">
                        <h4>Password:</h4>
                        <input type="password" value={password} placeholder="Contraseña" onChange={( e )=> setPassword(e.target.value)} required></input>
                    </div> 
                    <hr/>
                    <div className="container-row-3">
                        <h4>Rol:</h4>
                        <select placeholder="Rol" className="select-edit">
                            <option>Administrador</option>
                            <option>Moderador</option>
                            <option>Usuario</option>
                        </select>                        
                    </div> 
                    <hr className="hr-select"/>
                </div>
                <div className="footer">
                    <button className="bt-cancel-edit" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-edit" onClick={toEdit} >Editar</button>
                </div>
            </div>
        </div>
    )
}
export default ModalEdit;