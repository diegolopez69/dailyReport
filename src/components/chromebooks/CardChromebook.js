import React from "react";
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import "../../assets/css/chromebook/card.css"

const CardChromebook =()=>{
    const [number, setNumber] = useState("1");
    const [description, setDescription] = useState("En repración");
    const [armario, setArmario ] = useState("1");
    const [sn, setSn] = useState("CP314-1HN");
    const [stateChrome, setStateChrome] = useState(true);
    const [stateEdit, setStateEdit] = useState(false);


    return(
    <div className="background">
        <div className="container-icon">
            <div className="container-options">
                <EditIcon onClick={()=> setStateEdit(true)} className="icon-edit"/>
                <DeleteIcon  onClick={()=> alert("Seguro que quiere eliminar")} className="icon-delete" />
            </div>
            <div className="border-icon">
                <LaptopChromebookIcon className="icon-laptop" />
            </div>            
        </div>
        {!stateEdit?
            <div>
                <div className="body">
                    <h4> Chromebook {number} </h4>            
                        <div className="container-state">
                            <p>Operativo: </p>
                            <label class="switch">
                                <input type="checkbox"  checked={stateChrome} onChange={(e)=> setStateChrome(e.target.checked)}/>
                                <span class="slider round"></span>
                            </label>
                        </div>                            
                </div>
                <div className="footer">
                    <h6>{sn}</h6>
                </div>
            </div>
            :
            <div>
                <div className="body">
                    <div className="container-input-chrome">
                        <h4 className="text-chromebook"> Chromebook: </h4>
                        <input type="number" min="1" max="88" className="input-chrome" defaultValue={number} />
                    </div> 
                    <div className="container-input-sn"> 
                        <h4 className="text-sn">SN: </h4>  
                        <input className="input-idChrome" defaultValue={sn}/>
                    </div>
                    <div className="container-input-cabinet"> 
                        <h4 className="text-cabinet">Armario:  </h4>  
                        <input type="number" min="1" max= "3"  className="input-cabinet" defaultValue={armario}/>
                    </div>
                </div>
                <div className="footer-bt">
                    <button className="bt-cancel-chrome" onClick={()=>setStateEdit(false)} >Cancelar</button>
                    <button className="bt-save" >Guardar</button>
                </div>                
            </div> 
        }
        
    </div>
    )
}
export default CardChromebook;