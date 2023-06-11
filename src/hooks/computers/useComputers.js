import { useState, useEffect } from "react"
import { ToolType } from "../login/default-data";
import axios from 'axios';
export const useComputers = (type)=>{
    const [computers, setComputers] = useState([]);
    const url_api = process.env.REACT_APP_BASE_API;
    useEffect(()=>{
      const fetchData = async()=>{
        await axios.get(url_api+'/api/computer',{
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            setComputers(response.data)
        })
        .catch(error => {
            console.log("Error", error);
        });
      }
      fetchData();        
    }, [computers])

    const deleteComputerById = async({Computer_id})=>{
        const result = await axios.delete(url_api+`/api/computer/${Computer_id}`,{
                headers: {
                  'x-access-token': localStorage.getItem('token'),
                  'Content-Type': 'application/json'
                }
              })
        .then(response => response.data.status)
        .catch(error => error);
        return result;
    }
    const editComputerById = async(computer)=>{
        const result = await axios.put(url_api+`/api/computer/${computer.Computer_id}`, {Name:computer.Name},{
            headers: {
              'x-access-token': localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          })
        .then(response => response.data.status)
        .catch(error => error);
        return result;
    }
    const createComputer = async(computer)=>{
      const result = await axios.post(url_api+`/api/computer`, {Name:computer.Name},{
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
      .then(response => response.status)
      .catch(error => error);
      return result;
    }
  
    return {computers, deleteComputerById, editComputerById, createComputer}
}
