import React, {useState, useEffect} from 'react'
import { Row, Col, Tabs, Tab, Nav, Card } from 'react-bootstrap'
import Aux from '../../hooks/_Aux'
import CardInvetory from './CardInvetory'
import "../../assets/css/inventory/inventory.css"
import { getTools } from "../../data/inventory/getTools"
import ModalAddTool from './ModalAddTool'

const Inventory = props => {
    const[tools, setTools] = useState([]);
    const[openModal, setOpenModal] = useState(false)
    
    useEffect(()=>{
        getTools().then((resolve)=>{
            setTools(resolve);
        })
    }, [tools])
    return (
        <Aux>
            <Row>
                <Col>
                    <button onClick={ ()=> setOpenModal(true)} className='bt-add'>Nuevo Chromebook</button>
                    { openModal &&  <ModalAddTool openModal={setOpenModal} />}
                    <Tab.Container defaultActiveKey='hardaware'>
                        <Row>
                            <Col sm={3}>
                                <Nav variant='pills' className='flex-column'>
                                    <Nav.Item>
                                        <Nav.Link eventKey='hardaware'>HARDWARE</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey='software'>SOFTWARE</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content className='tab-content-inventory'>
                                    <Tab.Pane  eventKey='hardaware'>
                                        {tools? tools.filter((element)=> element.Tipo == "Hardware").map((element, index)=> {
                                            return(
                                                <CardInvetory key={element.Herramienta_id} data={element} index={index+1}/>
                                            )
                                        }): "Cargando..."}                                        
                                    </Tab.Pane>
                                    <Tab.Pane eventKey='software'>
                                        {tools? tools.filter((element)=> element.Tipo == "Software").map((element, index)=> {
                                            
                                            return(
                                                <>
                                                    <CardInvetory key={element.Herramienta_id} data={element} index={index+1}/>
                                                </>
                                            )
                                        }): "Cargando..."}   
                                    </Tab.Pane> 
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Col>
            </Row>
        </Aux>
    )
}

export default Inventory
