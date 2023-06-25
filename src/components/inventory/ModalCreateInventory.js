import React, { useState } from 'react'
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import {useComputers} from '../../hooks/computers/useComputers'
import { useItems } from '../../hooks/items';
import { useInventory } from '../../hooks/inventory/useInventory';
import '../../assets/css/inventory/modalCreateInventory.css'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { floors } from './default-data';
import TextField from '@mui/material/TextField';
import { useClassrooms } from '../../hooks/classrooms/useClassrooms';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const ModalCreateInventory =({openModal, inventory,  responseOk, responseError})=> {
    const {computers} = useComputers();
    const {classrooms} = useClassrooms();
    const {createInventory, updateInventory} = useInventory();
    const theme = useTheme();
    const [amount, setAmount ]= useState(inventory? inventory.Amount:0);
    const [selectedFloor, setSelectedFloor] = useState( inventory? floors.indexOf(inventory.tb_classroom.Floor):'');
    const[selectedItems, setSelectedItems] =useState(inventory? inventory.Tool_id:'');
    const [selectedClassroom, setSelectedClassroom] = useState(inventory? inventory.tb_classroom.Classroom_id:'')
    const[selectedComputer, setSelectedComputer] =useState(inventory? inventory.Computer_id: '')
    const {tools} = useItems();
    const [errorFields, setErrorFields] = useState(false);
    const computersFormat = computers.map((row) => {return({value: row.Computer_id, label:row.Name})})
    const itemsFormat = tools.map((row) => {return({value: row.Tool_id, label:row.Name})})
    const handlerChangeItems = (selected)=>{
        setSelectedItems(selected);
    }
    const handlerChangeComputer = (selected)=>{
        setSelectedComputer(selected)
    }
    const handlerSaveChanges = async()=>{
        if(inventory){
            if(selectedClassroom == '' ||  selectedClassroom == ''  || selectedComputer == '' || selectedItems == '' || amount == ''){
                setErrorFields(true)
                setTimeout(() => {
                    setErrorFields(false)
                }, 4000);
            }else{
                       
                console.log(selectedClassroom, selectedComputer, selectedItems, amount)
                const result = await updateInventory( inventory.Inventory_id, selectedClassroom, selectedComputer, selectedItems, parseInt(amount) );
                if(result == 200){
                    responseOk(true)
                    openModal(false);
                }else{
                    responseError(true)
                }
            }

            
        }else{
            if(selectedClassroom == '' ||  selectedClassroom == ''  || selectedComputer == '' || selectedItems == '' || amount == ''){
                setErrorFields(true)
                setTimeout(() => {
                    setErrorFields(false)
                }, 4000);
            }else{                
                console.log(selectedClassroom, selectedComputer, selectedItems)
                const result = await createInventory(selectedClassroom, selectedComputer, selectedItems,parseInt(amount) );
                if(result == 201){
                    responseOk(true)
                    openModal(false);
                }else{
                    responseError(true)
                }
            }
            
        }   
    }

    const handleChange = (event) => {
        const {
            target: { value },
          } = event;
          setSelectedItems(value);
  };
  return (
    <div className="modalBackground">
            <div className="modalContainer">
                <div className='tittle-header-modal-computer'>
                    <h5 className="title-item-modalCreate">{inventory?  "Inventario":"Nuevo Inventario"} </h5>
                    <br></br>
                </div>
                <div className="body-add-edit">
                    <Box sx={{ minWidth: 400, maxWidth: 400, marginRight:3, marginBottom:3, marginTop:2}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Planta</InputLabel>
                            
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedFloor}
                            label="Age"

                            onChange={ (event)=> setSelectedFloor( parseInt(event.target.value ))}
                            >
                            {floors.map((element, index)=>{
                                return <MenuItem value={index}>{element}</MenuItem>
                                })
                                
                            }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 400, maxWidth: 400, marginRight:3,marginBottom:3}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Aula</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedClassroom}
                            label="Aula"

                            onChange={ (event)=> setSelectedClassroom(event.target.value )}
                            >
                            {classrooms.filter((row)=> (selectedFloor === '' && selectedFloor != 0? "": parseInt(floors[selectedFloor]) == parseInt(row.Floor) )).map((element, index)=>{
                                return <MenuItem value={element.Classroom_id}>{element.Floor}.{element.Number}</MenuItem>
                                })
                                
                            }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 400, maxWidth: 400, marginRight:3, marginBottom:3}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Ordenador</InputLabel>
                            
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedComputer}
                            label="Age"

                            onChange={ (event)=> setSelectedComputer(event.target.value)}
                            >
                            {computers.map((element, index)=>{
                                return <MenuItem value={element.Computer_id}>{element.Name}</MenuItem>
                                })
                                
                            }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 400, maxWidth: 400, marginRight:3}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Ítems</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedItems}
                        label="Age"

                        onChange={ (event)=> setSelectedItems(event.target.value )}
                        >
                        {tools.map((element, index)=>{
                            return <MenuItem value={element.Tool_id}>{element.Name}</MenuItem>
                            })
                            
                        }
                        </Select>
                    </FormControl>
                    </Box> 
                    <Box sx={{ minWidth: 330,  maxWidth: 330, marginRight:12, marginTop:2}}>
                        <FormControl fullWidth>
                            <TextField 
                                sx={{ minWidth:400,maxHeight:10, maxHeight:1, marginBottom:3}}
                                    id="outlined-required"
                                    label="Cantidad"
                                    type='number'
                                    value={amount}
                                    onChange={(event)=>setAmount(event.target.value)}
                            />
                        </FormControl>
                    </Box>
                </div>
                <div className='errorFields'>{errorFields? "Complete correctamente los campos": ""}</div>
                <div className="footer">
                    <button className="bt-close-modal-create" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-save-modal-create" onClick={handlerSaveChanges} >Guardar</button>
                </div>
            </div>
        </div>
  )
}
function getStyles(name, personName, theme) {
    return {
      fontWeight:
      personName.findIndex(obj => obj.value === name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
export default ModalCreateInventory