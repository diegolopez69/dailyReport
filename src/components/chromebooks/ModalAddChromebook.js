import React from "react"
import check from "../../assets/images/check.png"
import "../../assets/css/chromebook/modalAddChromebook.css"
import { useState } from "react"
import { postUser } from "../../data/chromebook/postChromebook"

const ModalAddChromebook = ({openModal})=>{
    const [state, setState] = useState(1)
    const [description, setDescription] = useState("");
    const [number, setNumber] = useState();
    const [sn, setSn] = useState("");
    const [wardrobe, setWardrove] = useState();

    const toCreate = ()=>{
        const data = {
            Estado: state,
            Descripcion: description,
            No_chromebook: number,
            No_sn: sn,
            No_armario: wardrobe,
            No_chr_funcionales: 1,
            No_chr_no_funcionales: 1,
            No_chr_totales: 1,
        }
        postUser( data ).then((resolve)=>{
            alert("Usuario creado")
            setNumber()
            setSn()
            setWardrove()
        }).catch( (error)=>{
            
        })
    }

    return(
        <div className="modalBackground-chrome">
            <div className="modalContainer-chrome">
                <button className="bt-close-chrome" onClick={()=> openModal(false)}>X</button>
                <form>
                <div className="body-chrome">
                    <div className="container-row-number">
                        <h4>Numero:</h4>
                        <input type="number" onChange={(e)=>setNumber(e.target.value)}  placeholder="Numero de Chromebook" required></input>
                        <img src={check} className="icon-check"/>
                    </div>
                    <hr/>
                    <div className="container-row-sn">
                        <h4>SN:</h4>
                        <input type="text" onChange={(e)=> setSn(e.target.value)} minLength="8" maxlength="10" placeholder="Serie de la chromebook" required ></input>
                        <img src={check} className="icon-check"/>
                    </div>
                    <hr/>
                    <div className="container-row-wardrobe">
                        <h4>Armario:</h4>                        
                        <input type="number" onChange={(e)=> setWardrove(e.target.value)} min="1" max="3" placeholder="Numero de armario" required></input>
                        <img src={check} className="icon-check"/>
                    </div> 
                    <hr/>
                </div>
                <div className="footer-chrome">
                    <button className="bt-cancel-chrome" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-add-chrome" onClick={toCreate} type="submit" >Añadir</button>
                </div>
                </form>
            </div>
        </div>
    )
}
export default ModalAddChromebook;