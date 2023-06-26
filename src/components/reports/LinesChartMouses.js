import { Line } from 'react-chartjs-2';
import React from 'react';
import { useState, useEffect } from "react"
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


var misoptions = {
    scales : {
        y : {
            min : 0
        },
        x: {
            ticks: { color: 'rgb(255, 99, 132)'}
        }
    }
};

const LinesChartMouses = ()=> {
    const [dataMouses, setDataMouses] = useState('');
    const url_api = process.env.REACT_APP_BASE_API;
    useEffect(()=>{
        const fetchData = async()=>{
            await axios.get(url_api+'/api/report/mouses',{
            headers: {
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
            })
            .then(response => {
                setDataMouses(response.data)
            })
            .catch(error => error);
        }
        
        fetchData();
    }, [dataMouses])

    var beneficios = dataMouses != ''? dataMouses.theoretical_quantity_mouses.map((element)=> element.quantity_mouses) : [0, 0,0,0,0,0,0,0,0,0,0,0]

    var midata = {
        labels: meses,
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: 'Cantidad Total',
                data: beneficios,
                tension: 0.5,
                fill : true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(255, 99, 132)',
                pointBackgroundColor: 'rgba(255, 99, 132)',
            },
            // {
            //     label: 'Cantidad Actual',
            //     data: dataMouses != ''? dataMouses.actual_number_of_mouses.map((element)=> element.total_mouses) : [0, 0,0,0,0,0,0,0,0,0,0,0]
            // },
        ],
    };
    
    return <><Line data={midata} options={misoptions}/></>
}
export default LinesChartMouses