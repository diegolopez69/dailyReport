import React from 'react'
import CardComputer from './CardComputer'
import { useState } from 'react'
import '../../assets/css/computer/index.css'
import ModalCreateEditComputer from '../computers/ModalCreateEditComputer'
import { useComputers } from '../../hooks/computers/useComputers'
const Computers = ()=> {
  const[openModalCreate , setOpenModalCreate] = useState(false);
  const{computers} = useComputers();
  return (
    <>
      <div >
        <div className='header-container'>
          <button className='bt-add-modal' onClick={()=> setOpenModalCreate(true)}>Añadir Ordenador</button>
        </div>
        <div className="container-cards-computer">
          {computers.map(( row, index)=> {
            return(
              <CardComputer key={index} computer={row}/>
            )
          })}
        </div>          
      </div>
      {openModalCreate && <ModalCreateEditComputer openModal={setOpenModalCreate}/>}
    </>
    
  )
}

export default Computers