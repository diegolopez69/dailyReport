import React from "react";
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import "../../assets/css/chromebook/card.css"
import ModalDeleteChromebook from "./ModalDeleteChromebook";
import { putChromebook } from "../../data/chromebook/putChromebook";

const 
CardChromebook =( {data} )=>{

    const [number, setNumber] = useState(data.No_chromebook);
    const [description, setDescription] = useState(data.Descripcion);
    const [wardrobe, setWardrobe ] = useState(data.No_armario);
    const [sn, setSn] = useState(data.No_sn);
    const [stateChrome, setStateChrome] = useState(data.Estado);
    const [stateEdit, setStateEdit] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false)
    const [descriptionEdited, setDescriptionEdited] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)

    const toEditDescription = ()=>{
        if(description.length==0){            
            setTimeout(() => {
                setErrorDescription(false) 
            }, 2000);           
            setErrorDescription(true)
        }else{
            // putChromebook(data.Chromebook_id, sn, number, wardrobe).then(()=>console.log("Editado"))

            setDescriptionEdited(true)
            setErrorDescription(false)
            setStateChrome(false)
            alert("Editación")            
        }
    }
    const toEditBody =( )=>{
        putChromebook(data.Chromebook_id, sn, number, wardrobe).then(()=>console.log("Editado"))
        setStateEdit(false)
    }
    const toChangeState = ( event )=>{
        if( event.target.value == "on" && description==""){            
            setStateChrome(false)
        }else{
            setDescriptionEdited(false)
            setDescription("")
            setStateChrome(true)
        }
    }
    return(
    <div className="background" >
        <div className="container-icon">
            <div className="container-options">
                <EditIcon onClick={()=> setStateEdit(true)} className="icon-edit"/>
                <DeleteIcon  onClick={()=>setOpenModalDelete(true)} className="icon-delete" />                
                {openModalDelete && <ModalDeleteChromebook openModal={setOpenModalDelete} idChromebook={data.Chromebook_id} number={number}/>}
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
                                <input type="checkbox"  checked={stateChrome} onClick={toChangeState}/>
                                <span class="slider round"></span>
                            </label>
                        </div>

                    { !stateChrome && !descriptionEdited?
                        <div>
                            <div className="container-input-description">
                                <h4 className="text-description" >Descripción:</h4>
                                <input className={ !errorDescription ? "input-description" : "input-description-error"}  onChange={(e)=>setDescription(e.target.value)}/>
                            </div> 
                            <div className="footer-description">
                                <CloseIcon onClick={()=>setStateChrome(true)} className="icon-cancel-description"/>
                                <CheckIcon onClick={toEditDescription} className="icon-check-description"/>
                            </div>
                        </div>                        
                        :
                        <div className="footer">
                            { description==""? 
                                <h6>{sn}</h6>:
                                <>
                                    <h6 className="descriptionEdited">{description}</h6>
                                    <h6>{sn}</h6>
                                </>
                            }
                        </div>
                    }                           
                </div>
                
            </div>
            :
            <div>
                <div className="body">
                    <div className="container-input-chrome">
                        <h4 className="text-chromebook"> Chromebook: </h4>
                        <input type="number" min="1" max="88" onChange={(e) => setNumber(e.target.value)} className="input-chrome" defaultValue={number} />
                    </div> 
                    <div className="container-input-sn"> 
                        <h4 className="text-sn">SN: </h4>  
                        <input className="input-idChrome" onChange={(e)=> setSn(e.target.value)} defaultValue={sn}/>
                    </div>
                    <div className="container-input-cabinet"> 
                        <h4 className="text-cabinet">Armario:  </h4>  
                        <input type="number" min="1" max= "3" onChange={(e)=>setWardrobe(e.target.value)} className="input-cabinet" defaultValue={wardrobe}/>
                    </div>
                </div>
                <div className="footer-bt">
                    <button className="bt-cancel-chrome" onClick={()=>setStateEdit(false)} >Cancelar</button>
                    <button className="bt-save" onClick={toEditBody} >Guardar</button>
                </div>                
            </div> 
        }
        
    </div>
    )
}
export default CardChromebook;