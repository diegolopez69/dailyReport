import { element } from 'prop-types'
import React, { useState } from 'react'
import '../../assets/css/inventory/continer-classrooms.css'
import ModalByClassroom from './ModalByClassroom'
//informacion ya filtrada
const ClassroomsContainer = ({classroom}) => {
  const [openModalClassroom, setOpenModalClassroom] = useState(false);
  const [currentClassrroom, setCurrentClassroom ] =useState({});

  const handlerOpenModal = (classroom)=>{
    setCurrentClassroom(classroom)
    setOpenModalClassroom(true)

  }
  return (
    <div className='container-classrooms '>{
      classroom.map((element, index) => {
        return(
          <>
            <button className='bt-add-modal' onClick={()=>handlerOpenModal(element)}>{element.Floor}.{element.Number}</button>
          </>        
        ) 
    })}
     {openModalClassroom &&  <ModalByClassroom openModal= {setOpenModalClassroom} classroom={currentClassrroom}/>}
    </div>
  )
}

export default ClassroomsContainer