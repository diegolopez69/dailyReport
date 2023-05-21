import { useState } from "react"
import axios from 'axios';

export const useRevision = ()=>{
    const url_api = process.env.REACT_APP_BASE_API;
    const [revision, setRevision] = useState([]);
    const resetRevision = async(revision)=>{
        
    }
    const getRevisionByWeek = async(week)=>{
        const result = await axios.get(url_api+`/api/checkups`,week,{
            headers: {
              'x-access-token': localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          })
          .then(response => setRevision(response.data) )
          .catch(error => {
              console.log("Error", error);
          })
          return result
    }
    const createRevision = async(revision)=>{
        const dataRevision = revision.map((element)=>{
            return(
                {
                    Comments: element.Comments,
                    there_is: element.there_is,
                    works: element.works,
                    Actual_amount: element.Actual_amount,
                    Inventory_id: element.Inventory_id,
                }
            )
        })
        const result = dataRevision.map(async(element)=>{
            console.log(element);
          await axios.post(url_api+`/api/checkups`,element,{
            headers: {
              'x-access-token': localStorage.getItem('token'),
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.data.status)
          .catch(error => {
              console.log("Error", error);
          })
        })
        return result;
    }

    return {createRevision}
}
