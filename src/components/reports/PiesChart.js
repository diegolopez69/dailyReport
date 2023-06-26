import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from "react"
import axios from 'axios';
import { useClassrooms } from '../../hooks/classrooms/useClassrooms';
ChartJS.register(ArcElement, Tooltip, Legend);

var options = {
    responsive : true,
    maintainAspectRatio: false,
};



const Pies = ()=> {
    const [dataClassroomsChecked, setDataClassroomsChecked] = useState('');
    const url_api = process.env.REACT_APP_BASE_API;
    const {classrooms} = useClassrooms();
    useEffect(()=>{
        const fetchData = async()=>{
            await axios.get(url_api+'/api/report/classroomsChecked',{
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
            })
            .then(response => {
                setDataClassroomsChecked(response.data.WeekClassroomCheckedAndNot)
            })
            .catch(error => error);
        }
        
        fetchData();
    }, [dataClassroomsChecked])
    var data = {
        labels: ['Aulas Revisadas', 'Aulas No Revisadas'],
        datasets: [
            {
            label: 'Nº de aulas',
                data: dataClassroomsChecked !== ''? [classrooms.length -dataClassroomsChecked[0], dataClassroomsChecked[0]]: [0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    
    return<><Pie data={data} options={options} /></> 
}
export default Pies;
