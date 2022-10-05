import React from 'react'
import { Row, Col, Tabs, Tab} from 'react-bootstrap'
import CardChromebook from './CardChromebook'
import Aux from '../../hooks/_Aux'
import "../../assets/css/chromebook/chromebook.css"

const Chromebooks = () => {
    return (
        <Aux>
            <Row>
                <Col>
                    {/* <h5>Chromebooks Basic Tabs</h5> */}
                    <hr />
                    <button onClick={ ()=> alert("Botón en proceso, gracias por la comprensión")} className='bt-add-chromebook'>Nuevo Chromebook</button>
                    <Tabs >
                        <Tab eventKey='armario1' title='Armario 1'>
                            <CardChromebook/>
                        </Tab>
                        <Tab eventKey='armario2' title='Armario 2'>
                            <p>
                                Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes
                                anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR.
                                Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack
                                odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint
                                qui sapiente accusamus tattooed echo park.
                            </p>
                        </Tab>
                        <Tab eventKey='armario 3' title='Armario 3'>
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

export default Chromebooks
