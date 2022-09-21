import React from "react";
import "../../assets/css/modalAddUser.css"
const ModalAddUser =({ openModal })=>{
    return(
        <div className="modalBackground-add">
            <div className="modalContainer-add">
                <button className="bt-close-add" onClick={()=> openModal(false)}>X</button>
                <div className="body-add">
                    <div className="container-row-name">
                        <h4>Nombre:</h4>
                        <input type="text" placeholder="Nombre"></input>
                        
                    </div>
                    <hr/>
                    <div className="container-row-email">
                        <h4>Email:</h4>
                        <input type="email" placeholder="Email"></input>
                    </div>
                    <hr/>
                    <div className="container-row-password">
                        <h4>Password:</h4>
                        <input type="password" placeholder="Contraseña"></input>
                    </div> 
                    <hr/>
                    <div className="container-row-rol">
                        <h4>Rol:</h4>
                        <select placeholder="Rol" className="select-edit">
                            <option>Administrador</option>
                            <option>Moderador</option>
                            <option>Usuario</option>
                        </select>                        
                    </div> 
                    <hr className="hr-select-add"/>
                </div>
                <div className="footer-add">
                    <button className="bt-cancel-add" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-add" >Añadir</button>
                </div>
            </div>
        </div>
    )
}
export default ModalAddUser