import React, {useState}from "react";
import '../../assets/css/card.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import { useUser } from "../../hooks/user/useUser";
const Card =( {data, currentUser, openModal, method, openOkResponse, openeErrorResponse, openDeleteUser, openDeleteErrorUser} )=>{
    const {deleteUserById} = useUser();
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const handleEditUser =(data)=>{
        method('update')
        currentUser(data)
        openModal(true)
    }
    const handleDeleteUser =async(user_id)=>{
        const result = await deleteUserById(user_id)
        if(result == 200){
            openDeleteUser(true)
            openOkResponse(true)
        }else{
            openDeleteErrorUser(true)
            openeErrorResponse(true)
        }
    }
    
    return (
        <>
            <div className="Card">
                <div className="upper-container">
                    <div className="icon-container">
                        <AccountCircleIcon className="icon-user"></AccountCircleIcon>
                    </div>                
                </div>                
                
                <div className="lower-container">
                    <h3>{data.name}</h3>
                    <h4>{data.email}</h4>
                    <div className="lower-rol-container">
                        <h5>{data.roles.length == 3? "Admin":(data.roles.length == 2? "Moderator": "User")}</h5>
                    </div>
                    <span onClick={()=> handleEditUser(data)}><EditIcon/></span>
                    <span onClick={()=> handleDeleteUser(data.id)}><DeleteIcon/></span>                
                </div>                
            </div>
        </>
        

    )
}
export default Card;