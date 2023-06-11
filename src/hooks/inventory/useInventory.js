import { useState, useEffect } from "react"
import { ToolType } from "../login/default-data";
import axios from 'axios';
export const useInventory = (classroom)=>{
    const [inventory, setInventory] = useState([]);
    const url_api = process.env.REACT_APP_BASE_API;
    useEffect(()=>{
      const fetchData = async()=>{
        await axios.get(url_api+'/api/inventory',{
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            setInventory(response.data)
        })
        .catch(error => {
            console.log("Error", error);
        });
      }
      
      fetchData();
      
        
    }, [inventory])

    const deleteInventoryById = async({Inventory_id})=>{
        const result = await axios.delete(url_api+`/api/inventory/${Inventory_id}`,{
                headers: {
                  'x-access-token': localStorage.getItem('token'),
                  'Content-Type': 'application/json'
                }
              })
        .then(response => response.data.status)
        .catch(error => {
            console.log("Error", error);
        });
        return result;
    }
    const getInventoryById = async(id)=>{
        const result = await axios.get(url_api+`/api/tool/${id}`,{
            headers: {
              'x-access-token': localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          })
        .then(response => response.data.status)
        .catch(error => {
            console.log("Error", error);
        });
        return result;
    }
    const createInventory = async(classroom, computer, tools)=>{
       const  result = await Promise.all(tools.map(async(element)=>{
        try {
          const response = await axios.post(url_api+`/api/inventory`, {Classroom_id: classroom, Computer_id:computer, Tool_id:element},{
            headers: {
              'x-access-token': localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          })
          return response.data.status;
        }catch (error) {
          return error;
        }
      }))
      console.log(result);
      return result;
    }
    const updateInventory = async(inventory_id, Classroom_id, Computer_id, Tool_id)=>{
      
        const result = await axios.put(url_api+`/api/inventory/${inventory_id}`, {Classroom_id: Classroom_id, Computer_id:Computer_id, Tool_id:Tool_id},{
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.status)
        .catch(error => error)
      return result
    }
  
    return {inventory, createInventory, deleteInventoryById, updateInventory}
}
