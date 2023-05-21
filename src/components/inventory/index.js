import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../../assets/css/inventory/index.css'
import { floors } from './default-data';
import {useClassrooms} from '../../hooks/classrooms/useClassrooms' 
import ClassroomsContainer from './ClassroomsContainer';
const InventoryGeneral = () => {
  const {classrooms} = useClassrooms();
  return (
      <Accordion defaultActiveKey="0">
      {
        
        floors.map(( element, index) =>{
          return(
          <Accordion.Item eventKey={index}>
            <Accordion.Header className='accordion-header-inventory'>Planta {element}</Accordion.Header>
            <Accordion.Body>
              <h5 className='tittle-accordion-body'>Aulas: </h5>
              <hr></hr>
              <ClassroomsContainer classroom={classrooms.filter((row) => row.Floor == element)}/>
            </Accordion.Body>
          </Accordion.Item>)
        })
      }
      </Accordion>  
  )
}

export default InventoryGeneral