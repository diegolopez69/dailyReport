import React, {useState}from 'react'
import DvrIcon from '@mui/icons-material/Dvr';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalCreateEditComputer from './ModalCreateEditComputer';
import ModalDeleteComputer from './ModalDeleteComputer';
import '../../assets/css/computer/cardComputer.css'
const CardComputer =({computer={Computer_id:0, Name:"PC91922", Serial:"SSSSSSSSSS"}})=> {
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false)
    return (
        <div className="Card-computer">
            <div className="upper-container-computer">
                <div className="icon-container">
                    <DvrIcon className="icon-computer"></DvrIcon>
                </div>                
            </div> 
            <div className="lower-container">
                <h3>{computer.Name}</h3>
                <h4>Serie</h4>
                <span onClick={()=> setOpenModalEdit(true)}><EditIcon/></span>
                <span onClick={()=> setOpenModalDelete(true)}><DeleteIcon/></span>                
            </div>
            <div className="lower-rol-container">
                {openModalEdit && <ModalCreateEditComputer openModal={setOpenModalEdit} computer={computer}/>}
                {openModalDelete && <ModalDeleteComputer openModal={setOpenModalDelete} computer={computer}/>}
            </div>
            
        </div>
    )
}

export default CardComputer