import React from "react"
import check from "../../assets/images/check.png"
import "../../assets/css/chromebook/modalAddChromebook.css"
import { useState } from "react"
import { postUser } from "../../data/chromebook/postChromebook"
import '../../assets/css/check-classroom/modal-check-classroom.css'

const ModalCheck = ({openModal})=>{
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
        <div className="modalBackground-check-classroom">
            <div className="modalContainer-check-classroom">
                <button className="bt-close-check-classroom" onClick={()=> openModal(false)}>X</button>
                <form>
                <div className="body-check-classroom">
                    <div className="tile-type-tools">
                        <h6>Software</h6>
                        <h6>Hardware</h6>
                    </div>
                    
                </div>
                <div className="footer-check-classroom">
                    <button className="bt-cancel-check-classroom" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-add-check-classroom" onClick={toCreate} type="submit" >Añadir</button>
                </div>
                </form>
            </div>
        </div>
    )
}
export default ModalCheck;