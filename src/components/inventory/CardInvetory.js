import React, {useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "../../assets/css/inventory/card_inventory.css"
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { deleteTool } from "../../data/inventory/deleteTool";
import { putTool } from "../../data/inventory/putTool";
const CardInvetory = ({data, index})=> {
    const[editBody, setEditBody] = useState(false);
    const[nameTool, setNameTool] = useState(data.Nombre);
    const[typeTool, setTypeTool] = useState(data.Tipo);

    const toEdit =( )=>{
        putTool( data.Herramienta_id, typeTool, nameTool).then((resolve)=>{
            console.log(resolve);
        }).catch((error)=>{
            console.log(error);
        })
        alert("Se actualizó correctamente")
        setEditBody(false)
    }
    
    const toDelete =()=> {
        deleteTool(data.Herramienta_id).then((resolve, reject)=>{
            alert("Se eliminó correctamente", resolve);
            console.log(reject);
        }).catch((error)=>{
            console.log("este es", Error);
        })        
    }
    return(
        <div className="container-tools" >
            { editBody?
                <>
                    <h4 className="text-id">{index}</h4>
                    <imput placeholder="Tipo de Herramienta" ></imput>
                    <input placeholder="Nombre de la herramienta" defaultValue={nameTool} className="imput-name" onChange={(e)=>setNameTool(e.target.value)}/>
                    <select value={typeTool} className="select-type-tools" onChange={(e)=>setTypeTool(e.target.value)}  required>
                            <option value="Software" >Software</option>
                            <option value="Hardware">Hardware</option>
                    </select>
                    <CheckIcon onClick={toEdit} className="icon-check"/>
                    <CloseIcon onClick={()=>setEditBody(false)} className="icon-close"/>
                </>                
            :
                <>
                    <h4 className="text-id">{index}</h4>
                    <h4 className="text-name">{data.Nombre}</h4>                    
                    <div className="container-options-icon"> 
                        <EditIcon onClick={()=>setEditBody(true)}  className="icon-edit"/>
                        <DeleteIcon onClick={toDelete} className="icon-delete"/>
                    </div>                    
                </>                
            }
            
        </div>
    )
}
export default CardInvetory;