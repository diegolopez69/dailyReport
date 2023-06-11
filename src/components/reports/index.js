import React from 'react'
import { Row, Col, Tabs, Tab, Nav } from 'react-bootstrap'
import '../../assets/css/reports/index.css'
import Aux from '../../hooks/_Aux'
import LinesChart from "./LinesChart";
import BarsChart from "./BarsChart";
import PiesChart from "./PiesChart";
const Reports = props => {
    return (
        <>
            <div>
                <div className='div-container-title-addbt'>
                    <h5 className='tittle-page'>Reportes</h5>
                </div>
                <div className='container-body-reports'>
                    <LinesChart/>
                    <BarsChart/>
                    <PiesChart/>
                </div>
            </div>
        </>
    )
}

export default Reports
