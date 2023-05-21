import React, {useState} from 'react'
import { useInventory } from '../../hooks/inventory/useInventory';
import ModalAddRevision from './ModalAddRevision';
import moment from 'moment';
import '../../assets/css/revision/container-revision-by-classroom.css'

const ModalByClassroom =({openModal, classroom})=> {
    const[openModalAddRevision, setOpenModalAddRevision] =useState(false)
    const currentDate = moment();
    const currentWeek = currentDate.week();
  return (
    <>
        <div className="modalBackground-inventory-especific">
            <div className="modalContainer-inventory-especific">
                <div className="header-modal">
                <button className="bt-close" onClick={()=> openModal(false)}>X</button>
                </div>
                <div className='tittle-header-modal-inventory'>
                    <h5>Aula: {classroom.Floor}.{classroom.Number}</h5>
                    <hr></hr>
                </div>
                <div className='container-header-bt-add'>
                    <button className='bt-add-modal' onClick={()=>  setOpenModalAddRevision(true)}>Nueva revisión</button>
                </div>
                <div className='container-seacrh-revision'>
                    <h4>Semana actual {currentWeek}</h4>
                    <h5>Ver revisiones: </h5> <input type='number' placeholder="Número de semana" />
                    <button className='bt-add-modal'>Buscar</button>
                </div>              
                <div className="body-add-edit">
                
                </div>
            </div>
        </div>
        {openModalAddRevision && <ModalAddRevision openModal={setOpenModalAddRevision} classroom={classroom}/>}
    </>
  )
}

export default ModalByClassroom