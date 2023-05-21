import React, {useState} from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { BounceLoader } from "react-spinners";
import { useComputers } from '../../hooks/computers/useComputers';
function ModalDeleteComputer({openModal, computer}) {
  const{ deleteComputerById } = useComputers();
    const[loader, setLoading] = useState(false);
    const[serverResponse, setServerResponse] = useState({loaded:false, message:"" })
    const confirmDelete = async( )=>{
        setLoading(true)
        const result = await deleteComputerById(computer);
        if(result == 200){
            setLoading(false)
            setServerResponse({loaded:true, message: <div className="continer-result"><div className="response-result-text">Se ha eliminado correctamente</div><CheckCircleOutlineIcon className="icon-check-delete"/> </div>})
            setTimeout(() => {
                openModal(false)
              }, 2000);
        }else{
            setLoading(false)
            setServerResponse({loaded:true, message: <div className="continer-result"><div className="response-result-text">Error en el servidor, intentalo mas tarde</div><ErrorOutlineIcon className="icon-error-delete"/></div>})
            setTimeout(() => {
                openModal(false)
              }, 2000);
        }
    }
    const handlerClose = ()=>{
        openModal(false)
        setServerResponse({loaded:false, message:"" })
        
    }
    
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="header-modal">
                {!serverResponse.loaded && <button className="bt-close" onClick={handlerClose}>X</button>}
                </div>
                {loader? <div className="loader-container"><BounceLoader color="#289fd2" /></div>
                :
                serverResponse.loaded? serverResponse.message
                :
                <>
                    <div className="body">
                    <h4 className="text-delete">¿Esta seguro que desea eleminar el Ordenador " {computer.Name}"?</h4>
                    </div>
                    <div className="footer">
                        <button className="bt-cancel" onClick={()=> openModal(false)}>Cancelar</button>
                        <button className="bt-continue" onClick={confirmDelete}>Eliminar</button>
                    </div>
                </>                
                }
                
            </div>
        </div>
    )
}

export default ModalDeleteComputer