import React, {useState} from "react"
import check from "../../assets/images/check.png"
import "../../assets/css/inventory/modalAddComputer.css"
import { postComputer } from "../../data/inventory/computer/postComputer"
const ModalAddComputer = ({openModal})=>{
    
    const[name, setName ] = useState("")

    const toCreate = ()=>{
        postComputer( name ).then(()=>{
            alert("Se creó correctamente")
        })
        .catch((error)=>{
            console.log(error);
        })
        openModal(false)
    }

    return(
        <div className="modalBackground-computer">
            <div className="modalContainer-computer">
                <button className="bt-close-computer" onClick={()=> openModal(false)}>X</button>
                <div className="body-computer">
                    <div className="container-name-computer">
                        <h4>Nombre:</h4>
                        <input type="text" defaultValue={name} onChange={(e)=>setName(e.target.value)}   placeholder="Nombre del ordenador" required></input>
                        <img src={check} className="icon-check-computer"/>
                    </div>
                    <hr/>                  
                </div>
                <div className="footer-computer">
                    <button className="bt-cancel-computer" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-add-computer" onClick={toCreate} type="submit" >Añadir</button>
                </div>
            </div>
        </div>
    )
}
export default ModalAddComputer;