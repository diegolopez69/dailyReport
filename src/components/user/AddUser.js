import React, { useState } from "react"
import "../../assets/css/addUser.css"
import ModalAddUser from "./ModalAddUser";
const AddUser =()=>{
    const [openModal, setOpenModal] = useState(false);

    return(
        <div className="container-addUser">
            <button className="bt-openModal-add" onClick={()=>setOpenModal(true)}>Añadir Usuario</button>
            {openModal && <ModalAddUser openModal={setOpenModal}/>}
        </div>

    )
}
export default AddUser