import React, {useState} from 'react'
import { useComputers } from '../../hooks/computers/useComputers'
import '../../assets/css/computer/modalCreateEdit.css'

const ModalCreateEditComputer =({openModal, computer})=> {
    const [currentComputer, setCurrentComputer] = useState( computer? computer:{ Name:"", Serial:""});
    const {editComputerById, createComputer}  = useComputers();
    
    const handlerEditCreateCurrentComputer = async( )=>{
        if(computer){
            editComputerById(currentComputer);
            openModal(false);
        }else{
            console.log(currentComputer)
            createComputer(currentComputer);
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
                        <h4>Nombre:</h4>
                        <input className="input-name" type="text" defaultValue={currentComputer.Name} onChange={( e )=> setCurrentComputer( {...currentComputer, Name: e.target.value})} placeholder="Nombre" required></input>
                    </div>
                    <hr/>
                    <div className="container-row-number">
                        <h4>Serie:</h4>
                        <input className="input-serial" type="text" defaultValue={currentComputer.Serial} onChange={( e )=> setCurrentComputer( {...currentComputer, Serial: e.target.value})} placeholder="Serie" required></input>
                    </div>
                    <hr/>
                </div>
                <div className="footer">
                    <button className="bt-cancel" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-edit" onClick={handlerEditCreateCurrentComputer}>Guardar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalCreateEditComputer