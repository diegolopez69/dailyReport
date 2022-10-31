import React, {useState, useEffect} from "react";
import { getComputers } from "../../data/inventory/computer/getComputers";
import CardComputer from "./CardComputer";
import "../../assets/css/inventory/computer.css"
import ModalAddComputer from "./ModalAddComputer";
import SearchIcon from '@mui/icons-material/Search';

const Computer =()=>{
    const[computers, setComputers] = useState([]);
    const[openModal, setOpenModal] =useState(false)
    const[dataToSearch, setDataToSearch] = useState("");

    useEffect(()=>{
        getComputers().then((resolve)=>{
            setComputers(resolve);
        })

    }, [computers])
    return(
        <>
            <button onClick={ ()=> setOpenModal(true)} className='bt-toAdd-computer'>Nuevo Ordenador</button>
            {openModal && <ModalAddComputer openModal={setOpenModal}/>}
            <div className="search-computer">
                <input onChange={(e)=> setDataToSearch(e.target.value) } type="text" placeholder="Buscar ordenador"></input>
                <button><SearchIcon className="icon-search-computer"/></button>
            </div>
            <div className="container-cards-computer col-12 row">
                {computers? computers.filter(x => x.Nombre.toString().includes(dataToSearch)).map((element, index)=>{

                        return(
                            <CardComputer key={element.Ordenador_id} data={element} index={index}/>                     
                        )
                    }                
                )
                : 
                "Cargando..."}
            </div>  
        </>
    )
}
export default Computer;