import React from "react"
import check from "../../assets/images/check.png"
import "../../assets/css/inventory/modalAddTool.css"
import { useState } from "react"
import { postTool } from "../../data/inventory/postTool"
const ModalAddTool = ({openModal})=>{
    
    const[name, setName ] = useState("")
    const[type, setType ] = useState("Software")

    const toCreate = ()=>{
        postTool( type, name ).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
    }

    return(
        <div className="modalBackground-tool">
            <div className="modalContainer-tool">
                <button className="bt-close-tool" onClick={()=> openModal(false)}>X</button>
                <form>
                <div className="body-tool">
                    <div className="container-row-name">
                        <h4>Nombre:</h4>
                        <input type="text" defaultValue={name} onChange={(e)=>setName(e.target.value)}   placeholder="Nombre de la herramienta" required></input>
                        <img src={check} className="icon-check"/>
                    </div>
                    <hr/>
                    <div className="container-row-type">
                        <h4>Tipo:</h4>
                        <select defaultValue={type} className="select-type-tools" onChange={(e)=>setType(e.target.value)}  required>
                            <option value="Software" >Software</option>
                            <option value="Hardware">Hardware</option>
                        </select>
                    </div>
                    <hr className="hr-select-footer"/>                   
                </div>
                <div className="footer-tool">
                    <button className="bt-cancel-tool" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-add-tool" onClick={toCreate} type="submit" >Añadir</button>
                </div>
                </form>
            </div>
        </div>
    )
}
export default ModalAddTool;