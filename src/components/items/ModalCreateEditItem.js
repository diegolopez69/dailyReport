import React, { useState } from "react"
import { useItems } from "../../hooks/items";
const ModalCreateEditItem =({ openModal, item })=>{
    
    const [currentItem, setCurrentItem] = useState( item? item:{ Type:"", Name:""});
    const {editItemById, createItem}  = useItems();
    
    const handlerEditCreateCurrentItem = async( )=>{
        if(item){
            editItemById(currentItem);
            openModal(false);
        }else{
            console.log(currentItem)
            console.log( await createItem(currentItem));
            // openModal(false);
        }
    }
    
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="header-modal">
                <button className="bt-close" onClick={()=> openModal(false)}>X</button>
                </div>
                <div className="body-add-edit">
                    <div className="container-row-name">
                        <h4>Nombre:</h4>
                        <input type="text" defaultValue={currentItem.Name} onChange={( e )=> setCurrentItem( {...currentItem, Name: e.target.value})} placeholder="Nombre" required></input>
                    </div>
                    <hr/>
                    <div className="container-row-type">
                        <h4>Tipo:</h4>
                        <select defaultValue={ item? item.Type:"Init"} name="type" onChange={( e )=> setCurrentItem( {...currentItem, Type: e.target.value })}  placeholder="Tipo"  className="select-edit" required>
                            <option selected = {item? false: true} disabled value="Init">Seleccione el tipo</option>
                            <option selected = {item && item.Type == "Hardware" ? true: false} value="Hardware" >Hardware</option>
                            <option selected = {item && item.Type == "Software" ? true: false}value="Software">Software</option>
                        </select>  
                    </div>
                </div>
                <div className="footer">
                    <button className="bt-cancel" onClick={()=> openModal(false)}>Cancelar</button>
                    <button className="bt-edit" onClick={handlerEditCreateCurrentItem}>Guardar</button>
                </div>
            </div>
        </div>
    )
}
export default ModalCreateEditItem;