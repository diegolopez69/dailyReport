import React from "react";
import '../../assets/css/inventory/toolCard.css'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
const ToolCard =( { id, data })=>{
    const { Type, Name} = data;
    return(
        <div className="container-tool-invetory">
            <p>{id}</p>
            <p>{Type} </p>
            <p>{Name}</p>
            <ModeEditIcon className="icon-edit-tool"/>
            <DeleteIcon className="icon-delete-tool"/>
        </div>
    )
}
export default ToolCard;