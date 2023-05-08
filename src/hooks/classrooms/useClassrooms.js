import { useState, useEffect } from "react"
import axios from "axios";
export const useClassrooms = ()=>  {
    const[classrooms, setClassrooms] =useState([]);
    const url_api = process.env.REACT_APP_BASE_API;
    useEffect(()=>{
        const fetchData = async()=>{
          await axios.get(url_api+'/api/classroom',{
            headers: {
              'x-access-token': localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            setClassrooms(response.data)
          })
          .catch(error => {
              console.log("Error", error);
          });
        }
        
        fetchData();        
          
      }, [classrooms])
    const deleteClassroomById = async({Classroom_id})=>{
        const result = await axios.delete(url_api+`/api/classroom/${Classroom_id}`,{
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
    const editClassroomById = async(classroom)=>{
        const result = await axios.put(url_api+`/api/classroom/${classroom.Classroom_id}`, classroom,{
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
    const createClassroom = async(classroom)=>{
    
        const result = await axios.post(url_api+`/api/classroom`, classroom,{
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
    return {classrooms, deleteClassroomById, editClassroomById, createClassroom}

}
