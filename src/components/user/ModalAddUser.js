import React, { useEffect, useState } from "react";
import "../../assets/css/modalAddUser.css"
import { postUser } from "../../data/user/postUser";
import check from "../../assets/images/check.png"
const ModalAddUser =({ openModal })=>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rol, setRol] =useState("")

    const [ textResult, setTextResult] = useState("");
    const [textError, setTextError] = useState("");

    const createUser = ()=>{
        const data = {            
            username: username,
            email: email,
            password:password,
            rol:rol === "null" ? ["user"]: [rol]
        }
        postUser( data ).then((resolve)=>{
            resetStates()
            setTextResult("Usuario Creado")
        }).catch(()=>{
            setTextError("Error, intentelo mas tarde")
        })
    }

    const resetStates =()=>{
        setUsername("");
        setEmail("");
        setPassword("");
        setRol("");
    }
    return(
        <div className="modalBackground-add">
            <div className="modalContainer-add">
                <button className="bt-close-add" onClick={()=> openModal(false)}>X</button>
                <div className="body-add">
                    <div className="container-row-name">
                        <h4>Nombre:</h4>
                        <input type="text" value={username} onChange={( e )=> setUsername( e.target.value)} placeholder="Nombre" required></input>
                        <img src={check} className="icon-check"/>
                    </div>
                    <hr/>
                    <div className="container-row-email">
                        <h4>Email:</h4>
                        <input type="email" value={email} onChange={( e )=> setEmail(e.target.value)} placeholder="Email" required ></input>
                        <img src={check} className="icon-check"/>
                    </div>
                    <hr/>
                    <div className="container-row-password">
                        <h4>Password:</h4>                        
                        <input type="password" value={password} onChange={( e )=>setPassword(e.target.value)} placeholder="Contraseña" required></input>
                        <img src={check} className="icon-check"/>
                    </div> 
                    <hr/>
                    <div className="container-row-rol">
                        <h4>Rol:</h4>
                        <select defaultValue={rol} name="Roles" value={rol} placeholder="Rol" onChange={( e )=> setRol(e.target.value)} className="select-edit" required>
                            <option selected>Seleccione un rol</option>
                            <option value="user" >Usuario</option>
                            <option value="moderator">Moderador</option>
                            <option value="admin">Administrador</option> 
                        </select>                     
                    </div> 
                    <hr className="hr-select-add"/>
                </div>
                <div className="footer-add">
                    <button className="bt-cancel-add" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-add" onClick={createUser} type="submit" >Añadir</button>
                </div>
            </div>
        </div>
    )
}
export default ModalAddUser