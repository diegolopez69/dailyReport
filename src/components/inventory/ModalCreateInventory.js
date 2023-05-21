import React, { useState } from 'react'
import Select from 'react-select';
import {useComputers} from '../../hooks/computers/useComputers'
import { useItems } from '../../hooks/items';
import { useInventory } from '../../hooks/inventory/useInventory';
import '../../assets/css/inventory/modalCreateInventory.css'
const ModalCreateInventory =({openModal, classroom})=> {
    const {computers} = useComputers();
    const {createInventory} = useInventory();
    const[selectedItems, setSelectedItems] =useState([])
    const[selectedComputer, setSelectedComputer] =useState({})
    const {tools} = useItems();
    const computersFormat = computers.map((row) => {return({value: row.Computer_id, label:row.Name})})
    const itemsFormat = tools.map((row) => {return({value: row.Tool_id, label:row.Name})})
    const handlerChangeItems = (selected)=>{
        setSelectedItems(selected);
    }
    const handlerChangeComputer = (selected)=>{
        setSelectedComputer(selected)
    }
    const handlerSaveChanges =()=>{
        createInventory(classroom, selectedComputer, selectedItems);
    }
  return (
    <div className="modalBackground">
            <div className="modalContainer-inventory">
                <div className="header-modal">
                <button className="bt-close" onClick={()=> openModal(false)}>X</button>
                </div>
                <div className="body-add-edit">
                    <div className="container-row-computer-inventory">
                        <h4 className='name-first-fild-inventory'>Ordenador:</h4>
                        <Select
                            name="computers"
                            options={computersFormat}
                            className="basic-multi-select-inventory"
                            classNamePrefix="select"
                            onChange={handlerChangeComputer}
                        />
                    </div>
                    <div className="container-row-tools-inventory">
                        <h4 className='name-second-fild-inventory'>Ítems:</h4>
                        <Select
                            // defaultValue={[colourOptions[2], colourOptions[3]]}
                            isMulti
                            name="colors"
                            options={itemsFormat}
                            onChange={handlerChangeItems}
                            className="basic-multi-select-inventory-multi"
                            classNamePrefix="select"
                        />
                    </div>
                </div>
                <div className="footer">
                    <button className="bt-cancel" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-edit" onClick={handlerSaveChanges} >Guardar</button>
                </div>
            </div>
        </div>
  )
}

export default ModalCreateInventory