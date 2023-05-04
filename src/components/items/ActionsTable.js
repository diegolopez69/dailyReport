import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionsTable =( {value} ) =>{
    return (
    <>
        <EditIcon className='icon-edit'  onClick={()=>alert("Edit")}/>
        <DeleteIcon className='icon-delete' onClick={()=>alert("Delete")}/>
    </>)
}
export default ActionsTable;