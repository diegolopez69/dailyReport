import React, {useEffect, useState} from "react"
import Card from "./Card"
import AddUser from "./AddUser"
import "../../assets/css/user.css"
import { getUsers } from "../../data/user/getUsers"
import SearchIcon from '@mui/icons-material/Search';
import { useUser } from "../../hooks/user/useUser"

const User =()=>{
    const {usersGeneral} = useUser();
    const[autoRefesh, setAutoRefresh] = useState(true)
    const [dataToSearch, setDataToSearch] = useState(""); 

  
    return (
        <div>
            <div className="search">
                <input onChange={(e)=> setDataToSearch(e.target.value) } type="text" placeholder="Buscar usuario"></input>
                <button><SearchIcon className="icon-search"/></button>
            </div> 
            <AddUser/>
            {/* <div className="container-cards-userprofiles">
                <Card key={1} data={dataExample}/>
                <Card key={1} data={dataExample}/>
                <Card key={1} data={dataExample}/>
                <Card key={1} data={dataExample}/>
                <Card key={1} data={dataExample}/>
                <Card key={1} data={dataExample}/>
                
            </div>                    */}
            <div className="col-12 row"> 
                {usersGeneral.length === 0? "..error al cargar los datos": usersGeneral.filter(x => x.username.includes(dataToSearch) || x.email.includes(dataToSearch)).map((element)=>{
                    return( <Card key={element.id} data={element}/>)
                }) } 
            </div>                      
        </div>
    )
}
export default User;