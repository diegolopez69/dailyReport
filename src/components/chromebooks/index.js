import React from 'react'
import { Row, Col, Tabs, Tab} from 'react-bootstrap'
import CardChromebook from './CardChromebook'
import Aux from '../../hooks/_Aux'
import "../../assets/css/chromebook/chromebook.css"
import { useState, useEffect } from 'react'
import ModalAddChromebook from './ModalAddChromebook'
import { getChromebooks } from '../../data/chromebook/getChromebooks'
import SearchIcon from '@mui/icons-material/Search';

const Chromebooks = () => {
    const [openModal, setOpenModal] = useState(false);
    const [chomebooks, setChromebooks] = useState([]);
    const [dataToSearchTab1, setDataToSearchTab1] = useState("");
    const [dataToSearchTab2, setDataToSearchTab2] = useState("");
    const [dataToSearchTab3, setDataToSearchTab3] = useState("");


    useEffect(()=>{ 
        getChromebooks()
        .then((resolve)=>setChromebooks(resolve))              
    
    }, [ chomebooks ])

    return (
        <Aux>
            <Row>
                <Col>                    
                    <hr />
                    <button onClick={ ()=> setOpenModal(true)} className='bt-add-chromebook'>Nuevo Chromebook</button>
                    { openModal &&  <ModalAddChromebook openModal={setOpenModal} />}
                    <Tabs >
                        <Tab eventKey='armario1' title='Armario 1'>
                            <div className="search">
                                <input onChange={(e)=> setDataToSearchTab1(e.target.value) } type="text" placeholder="Buscar chromebook"></input>
                                <button><SearchIcon className="icon-search"/></button>
                            </div> 
                            <div className='container-cards-chrome col-12 row'>
                                { chomebooks.length==0? "Se esta cargando los datos": chomebooks.filter((element)=> element.No_armario == 1).filter(x => x.No_chromebook.toString().includes(dataToSearchTab1) || x.No_sn.toString().includes(dataToSearchTab1)).map( (element)=>{
                                    return(                                    
                                        <CardChromebook key={element.Chromebook_id} data = {element}/>
                                    )
                                })}
                            </div> 
                        </Tab>
                        <Tab eventKey='armario2' title='Armario 2'>
                            <div className="search">
                                <input onChange={(e)=> setDataToSearchTab2(e.target.value) } type="text" placeholder="Buscar chromebook"></input>
                                <button><SearchIcon className="icon-search"/></button>
                            </div> 
                            <div className='container-cards-chrome col-12 row'>
                                { chomebooks.length==0? "Se esta cargando los datos": chomebooks.filter((element)=> element.No_armario == 2).filter(x => x.No_chromebook.toString().includes(dataToSearchTab2) || x.No_sn.toString().includes(dataToSearchTab2)).map( (element)=>{
                                    return(                                    
                                        <CardChromebook key={element.Chromebook_id} data = {element}/>
                                    )
                                })}
                            </div> 
                        </Tab>
                        <Tab eventKey='armario 3' title='Armario 3'>
                            <div className="search">
                                <input onChange={(e)=> setDataToSearchTab3(e.target.value) } type="text" placeholder="Buscar chromebook"></input>
                                <button><SearchIcon className="icon-search"/></button>
                            </div> 
                            <div className='container-cards-chrome col-12 row'>
                                { chomebooks.length==0? "Se esta cargando los datos": chomebooks.filter((element)=> element.No_armario == 3).filter(x => x.No_chromebook.toString().includes(dataToSearchTab3) || x.No_sn.toString().includes(dataToSearchTab3)).map( (element)=>{
                                    return(                                    
                                        <CardChromebook key={element.Chromebook_id} data = {element}/>
                                    )
                                })}
                            </div> 
                        </Tab>
                    </Tabs>  
                </Col>
            </Row>
        </Aux>
    )
}

export default Chromebooks
