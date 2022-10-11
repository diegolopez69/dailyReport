
import React from "react";
import { deleteChromebook } from "../../data/chromebook/deleteChromebook";
import "../../assets/css/chromebook/modalDelete.css"
const ModalDeleteChromebook = ( { openModal, idChromebook, number})=>{

    const toDelete =()=>{
        deleteChromebook( idChromebook ).then((resolve)=>{
                     
            openModal(false)
        }).catch((e)=>{
            console.log("error al eliminar");
        })
        
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                    <button className="bt-close" onClick={()=> openModal(false)}>X</button>
                    <div className="body-modal-delete">
                        <h3>¿Esta seguro que desea eleminar Chromebook {idChromebook} "{number}"?</h3>
                    </div>
                    <div className="footer">
                        <button className="bt-cancel" onClick={()=> openModal(false)}>Cancelar</button>
                        <button className="bt-continue" onClick={toDelete} >Eliminar</button>
                    </div>                                   
            </div>
        </div>
    )
}
export default ModalDeleteChromebook;