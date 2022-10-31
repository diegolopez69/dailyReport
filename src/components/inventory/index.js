import React, {useState, useEffect} from 'react'
import { Row, Col, Tabs, Tab, Nav, Card } from 'react-bootstrap'
import Aux from '../../hooks/_Aux'
import CardTool from './CardTool'
import CardComputer from './CardComputer'
import "../../assets/css/inventory/inventory.css"
import { getTools } from "../../data/inventory/getTools"
import ModalAddTool from './ModalAddTool'
import Tools from './Tools'
import Computer from './Computer'
const Inventory = () => {
    
    return (
        <Aux>
            <Row>
                <Col>
                    <Tabs defaultActiveKey='tools'>
                        <Tab eventKey='tools' title='HERRAMIENTAS'>
                            <Tools/>
                        </Tab>
                        <Tab eventKey='computers' title='ORDENADORES'>
                            <Computer/>
                        </Tab>
                        <Tab eventKey='classrooms' title='AULAS'>
                            <p>
                                Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify
                                pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred
                                pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them,
                                vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.
                            </p>
                        </Tab>
                    </Tabs>
                    
                </Col>
            </Row>
        </Aux>
    )
}

export default Inventory
