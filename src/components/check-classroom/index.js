import React, {useState} from 'react'
import { Row, Col, Tabs, Tab, Nav } from 'react-bootstrap'
import '../../assets/css/check-classroom/index.css'
import Aux from '../../hooks/_Aux'
import ModalCheck from './ModalCheck'

const Check = props => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <Aux>
            <Row>
                <Col>
                    <h5></h5>
                    <hr />
                    <Tabs defaultActiveKey='planta-2'>
                        <Tab eventKey='planta-2' title='Planta -2'>
                            <button onClick={()=> setOpenModal(true)} className="bt-classroom-number" >-2.1</button>
                            { openModal &&  <ModalCheck openModal={setOpenModal} />}
                            <button onClick={()=> setOpenModal(true)} className="bt-classroom-number">-2.2</button>
                            { openModal &&  <ModalCheck openModal={setOpenModal} />}
                            <button className="bt-classroom-number">-2.3</button>
                        </Tab>
                        <Tab eventKey='planta-1' title='Planta -1'>
                            <p>
                                Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes
                                anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.
                                Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack
                                odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint
                                qui sapiente accusamus tattooed echo park.
                            </p>
                        </Tab>
                        <Tab eventKey='planta0' title='Planta 0'>
                            <p>
                                Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify
                                pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred
                                pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them,
                                vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.
                            </p>
                        </Tab>
                        <Tab eventKey='planta1' title='Planta 1'>
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

export default Check
