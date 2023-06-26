import React from 'react'
import { Row, Col, Tabs, Tab, Nav } from 'react-bootstrap'
import '../../assets/css/reports/index.css'
import Aux from '../../hooks/_Aux'
import LinesChartMouses from "./LinesChartMouses";
import BarsChart from "./BarsChart";
import PiesChart from "./PiesChart";
import LinesChartKeyboards from './LinesChartKeyboards';
import LinesChartProjectors from './LinesChartProjectors';
const Reports = props => {
    return (
        <>
            <div>
                <div className='div-container-title-addbt'>
                    <h5 className='tittle-page'>Reportes</h5>
                </div>
                <div className='container-body-reports'>
                    <div className='row1-grafics'>
                        <div className='container-pies-grafict'>
                            <h5 className='title-pies-grafict' style={{ marginBottom:20}}><b>Gráfico aulas revisadas y no revisadas</b></h5>
                            <PiesChart/>
                        </div>
                        <div className='container-pies-grafict'>
                            <h5 className='title-pies-grafict' style={{ marginBottom:20}}><b>Gráfico Teclados</b></h5>
                            <LinesChartKeyboards/>
                        </div>
                    </div>
                    <div className='row1-grafics'>
                        <div className='container-pies-grafict'>
                            <h5 className='title-pies-grafict' style={{ marginBottom:20}}><b>Gráfico Ratones</b></h5>
                            
                            <LinesChartMouses/>
                        </div>
                        <div className='container-pies-grafict'>
                            <h5 className='title-pies-grafict' style={{ marginBottom:20}}><b>Gráfico Proyectores</b></h5>
                            <LinesChartProjectors/>
                        </div>
                    </div>
                
                </div>
            </div>
        </>
    )
}

export default Reports
