import React from "react"
import "../../assets/css/modalDelete.css"
import { deleteUser } from "../../data/user/deleteUser.js"
const ModalDelete =({ openModal, idUser, username })=>{

    const toDelete =()=>{
        // console.log("id user", id);
        deleteUser( idUser ).then((response)=>{
            console.log("SE borro el usuario");
        })
        openModal(false)
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button className="bt-close" onClick={()=> openModal(false)}>X</button>
                <div className="body">
                    <h3>¿Esta seguro que desea eleminar este usuario "{username}"?</h3>
                </div>
                <div className="footer">
                    <button className="bt-cancel" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-continue" onClick={toDelete}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}
export default ModalDelete;