import { useState, useEffect } from "react"
import axios from 'axios';
export const useUser = ()=>{
    const [users, setUsers] = useState([]);
    const url_api = process.env.REACT_APP_BASE_API;
    useEffect(()=>{
      const fetchData = async()=>{
        await axios.get(url_api+'/api/user-roles',{
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
            setUsers(response.data)
        })
        .catch(error => {
            console.log("Error", error);
        });
      }
      
      fetchData();
      
        
    }, [users])

    const usersGeneral = users.filter(row => row.email != localStorage.getItem('email'));
    const deleteUserById = async({Tool_id})=>{
        const result = await axios.delete(url_api+`/api/user/${Tool_id}`,{
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
    const editUserById = async(user)=>{
        const result = await axios.put(url_api+`/api/user/${user.id}`, user,{
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
    const createUser = async(user)=>{
      
      const result = await axios.post(url_api+`/api/auth/signup`, user,{
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
  
    return {usersGeneral, editUserById, deleteUserById, createUser}
}
