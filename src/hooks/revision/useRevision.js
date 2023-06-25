import { useState, useEffect} from "react"
import axios from 'axios';
import { useInventory } from "../inventory/useInventory";
export const useRevision = ()=>{
    const url_api = process.env.REACT_APP_BASE_API;
    const [revision, setRevision] = useState([]);
    const {inventory} = useInventory();
    
    const [revisionWeek, setRevisionWeek] = useState([]);
    useEffect(()=>{
      const fetchData = async()=>{
        await axios.get(url_api+'/api/checkups',{
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          const dataRevisionWithInventory = response.data.filter((x)=> x.Inventory_id !== null).map((element)=>{
            return({
              Checkup_id: element.Checkup_id,
              Review: element.Review,
              there_is: element.there_is,
              Works: element.Works,
              Comments: element.Comments,
              Theoretical_amount: element.Theoretical_amount,
              Actual_amount: element.Actual_amount,
              createdAt: element.createdAt,
              Inventory_id: element.Inventory_id,
              dataInventory: inventory.filter((row)=> row.Inventory_id == element.Inventory_id).length != 0 ? inventory.filter((row)=> row.Inventory_id === element.Inventory_id)[0]: null
            })
          })
          setRevision(dataRevisionWithInventory)
        })
        .catch(error => {
            console.log("Error", error);
        });
      }
      fetchData();
      
        
    }, [revision])

  
    const deleteRevision = async(dataRevision)=>{
        const result = await Promise.all(dataRevision.map(async (element) => {
          try {
            const response = await axios.delete(url_api + `/api/checkups/${element}`, {
              headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
              }
            });
            return response.data.status;
          } catch (error) {
            console.log('Error', error);
          }
        }));
        return result;
    }
    const createRevision = async(revision)=>{
        const dataRevision = revision.map((element)=>{
            return(
                {
                    Comments: element.Comments,
                    there_is: element.there_is,
                    Works: element.Works,
                    Actual_amount: element.Actual_amount,
                    Theoretical_amount: element.Theoretical_amount,
                    Classroom_id: element.Classroom_id,
                    Review: 1,
                    Inventory_id: element.Inventory_id,
                }
            )
        })
        const result = await Promise.all(dataRevision.map(async (element) => {
          try {
            const response = await axios.post(url_api + '/api/checkups', element, {
              headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
              }
            });
            return response.data.status;
          } catch (error) {
            console.log('Error', error);
          }
        }));
        return result;
    }

    return {createRevision, revision, deleteRevision}
}
