import React from "react"
import "../../assets/css/modalAlert.css"

const ModalAlert =({ openModal })=>{

    const deleteUser =()=>{
        //api to delete
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button className="bt-close" onClick={()=> openModal(false)}>X</button>
                <div className="body">
                    <h3>¿Esta seguro que desea eleminar este usuario?</h3>
                </div>
                <div className="footer">
                    <button className="bt-cancel" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-continue" onClick={deleteUser}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}
export default ModalAlert;