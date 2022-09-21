import React from "react";
import "../../assets/css/modalEdit.css"

const ModalEdit =({ openModal })=>{



    return (
        <div className="modalBackground-edit">
            <div className="modalContainer-edit">
                <button className="bt-close-edit" onClick={()=> openModal(false)}>X</button>
                <div className="body-edit">
                    <div className="container-row-1">
                        <h4>Nombre:</h4>
                        <input type="text" placeholder="Nombre"></input>
                        
                    </div>
                    <hr/>
                    <div className="container-row-2">
                        <h4>Email:</h4>
                        <input type="email" placeholder="Email"></input>
                    </div>
                    <hr/>
                    <div className="container-row-3">
                        <h4>Password:</h4>
                        <input type="password" placeholder="Contraseña"></input>
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
                    <button className="bt-edit" >Editar</button>
                </div>
            </div>
        </div>
    )
}
export default ModalEdit;