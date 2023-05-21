import React, {useState}from "react";
import '../../assets/css/card.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
const Card =( {data} )=>{

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false)

    
    return (
        <div className="Card">
            <div className="upper-container">
                <div className="icon-container">
                    <AccountCircleIcon className="icon-user"></AccountCircleIcon>
                </div>                
            </div> 
            <div className="lower-container">
                <h3>{data.username}</h3>
                <h4>{data.email}</h4>
                <span onClick={()=> setOpenModalEdit(true)}><EditIcon/></span>
                <span onClick={()=> setOpenModalDelete(true)}><DeleteIcon/></span>                
            </div>
            <div className="lower-rol-container">
                <h5>{data.roles.length == 3? "Admin":(data.roles.length == 2? "Moderator": "User")}</h5>
                {openModalEdit && <ModalEdit openModal={setOpenModalEdit} data={data}/>}
                {openModalDelete && <ModalDelete openModal={setOpenModalDelete} idUser = {data.id} username={data.username} />}
            </div>
            
        </div>

    )
}
export default Card;