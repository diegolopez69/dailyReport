import React, {useEffect, useState} from "react"
import Card from "./Card"
import AddUser from "./AddUser"
import "../../assets/css/user.css"
import { getUsers } from "../../data/user/getUsers"
import SearchIcon from '@mui/icons-material/Search';

const User =()=>{
    const [dataUser, setDataUser] = useState([])
    const[autoRefesh, setAutoRefresh] = useState(true)
    const [dataToSearch, setDataToSearch] = useState(""); 
    useEffect(()=>{
        
        getUsers()
        .then(response => setDataUser(response))
        .catch(error => console(error))
    }, [dataUser])

    return (
        <div>
            <div className="search">
                <input onChange={(e)=> setDataToSearch(e.target.value) } type="text" placeholder="Buscar usuario"></input>
                <button><SearchIcon className="icon-search"/></button>
            </div> 
            <AddUser/>        
            <div className="col-12 row"> 
                {dataUser.length === 0? "..error al cargar los datos": dataUser.filter(x => x.username.includes(dataToSearch) || x.email.includes(dataToSearch)).map((element)=>{
                    return( <Card key={element.id} data={element}/>)
                }) } 
            </div>                      
        </div>
    )
}
export default User;