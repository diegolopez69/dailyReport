import React, { useState } from "react"
import { useClassrooms } from "../../hooks/classrooms/useClassrooms";
import '../../assets/css/classroom/modalCreateEdit.css'
const ModalCreateEditClassroom =({ openModal, classroom })=>{
    
    const [currentClassroom, setCurrentClassroom] = useState( classroom? classroom:{ Floor:"", Number:""});
    const {editClassroomById, createClassroom}  = useClassrooms();
    
    const handlerEditCreateCurrentClassroom = async( )=>{
        if(classroom){
            editClassroomById(currentClassroom);
            openModal(false);
        }else{
            console.log(currentClassroom)
            console.log( await createClassroom(currentClassroom));
            // openModal(false);
        }
    }
    
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="header-modal">
                <button className="bt-close" onClick={()=> openModal(false)}>X</button>
                </div>
                <div className="body-add-edit">
                    <div className="container-row-floor">
                        <h4>Planta:</h4>
                        <input className="input-number" type="number" defaultValue={currentClassroom.Floor} onChange={( e )=> setCurrentClassroom( {...currentClassroom, Floor: e.target.value})} placeholder="Planta" required></input>
                    </div>
                    <hr/>
                    <div className="container-row-number">
                        <h4>Número:</h4>
                        <input className="input-number" type="number" defaultValue={currentClassroom.Number} onChange={( e )=> setCurrentClassroom( {...currentClassroom, Number: e.target.value})} placeholder="Número" required></input>
                    </div>
                    <hr/>
                </div>
                <div className="footer">
                    <button className="bt-cancel" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-edit" onClick={handlerEditCreateCurrentClassroom}>Guardar</button>
                </div>
            </div>
        </div>
    )
}
export default ModalCreateEditClassroom;