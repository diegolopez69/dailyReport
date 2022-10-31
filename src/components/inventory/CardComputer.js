import React, { useState } from "react";
import "../../assets/css/inventory/card_computer.css"
import MonitorIcon from '@mui/icons-material/Monitor';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { putComputer } from "../../data/inventory/computer/putComputer";
import { deleteComputer } from "../../data/inventory/computer/deleteComputer";
const CardComputer =( {data, index})=>{
    const[editBody, setEditBody] = useState(false);
    const[nameComputer, setNameComputer ] = useState(data.Nombre);

    const toEdit =()=>{
        putComputer( data.Ordenador_id, nameComputer).then((resolve)=>{
            console.log(resolve);
        })
        setEditBody(false);
    }
    const toDelete=()=>{
        deleteComputer( data.Ordenador_id ).then((resolve)=>{
            console.log(resolve);
        })
    }
    return(
        <>
            <div className="background-computer" >
                <div className="container-icon-computer">
                    <p className="index-computer">{index}</p>
                    <div className="container-options-computer">
                        <EditIcon onClick={()=>setEditBody(true)} className="icon-edit-computer"/>
                        <DeleteIcon onClick={toDelete}  className="icon-delete-computer" />           
                    </div>
                    <div className="border-icon-computer">
                        <MonitorIcon className="icon-computer" />
                    </div>
                    { editBody?
                        <div className="container-body-edit">
                            <input defaultValue={nameComputer} className="input-computer-name" onChange={(e)=> setNameComputer(e.target.value)} />
                            <CheckIcon className="icon-check-compu" onClick={toEdit}  />
                            <CloseIcon className="icon-close-computer" onClick={()=>setEditBody(false)}></CloseIcon>
                        </div> 
                    :
                        <h4 className="text-computer-name">{nameComputer}</h4>
                    }
                              
                </div>
            </div>
        </>
    )
}
export default CardComputer;