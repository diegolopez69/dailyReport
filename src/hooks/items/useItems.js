import { useState, useEffect } from "react"
import { ToolType } from "../login/default-data";
import axios from 'axios';
export const useItems = (type)=>{
    const [tools, setTools] = useState([]);
    const url_api = process.env.REACT_APP_BASE_API;
    useEffect(()=>{
      const fetchData = async()=>{
        await axios.get(url_api+'/api/tool',{
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          setTools(response.data)
        })
        .catch(error => {
            console.log("Error", error);
        });
      }
      
      fetchData();
      
        
    }, [tools])

    const dataSoftware = tools.filter(row => row.Type == ToolType.software);
    const dataHardware = tools.filter(row => row.Type == ToolType.hardware);
    const deleteItemById = async({Tool_id})=>{
        const result = await axios.delete(url_api+`/api/tool/${Tool_id}`,{
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
    const editItemById = async(item)=>{
        const result = await axios.put(url_api+`/api/tool/${item.Tool_id}`, item,{
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
    const createItem = async(item)=>{
      
      const result = await axios.post(url_api+`/api/tool`, item,{
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
  
    return {dataSoftware, dataHardware, deleteItemById, editItemById, createItem}
}
