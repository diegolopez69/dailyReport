import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'

import Modal from '../modal-components'
import NotifyNews from './news'
import NotifyRequests from './requests'

import { useFetchGetNotifications } from '../../../../../../hooks/notification/fetch-data'
import { defaultIcons, apiAccess } from '../../../../../../hooks/notification/default-data'
import { apiAccessIncorrectRecords } from '../../../../../../hooks/my-requests/default-data'
import { useFetchGetIncorrectRecords } from '../../../../../../hooks/notification/fetch-data'
import { postCreateRequestFromNotify } from './../../../../../../data/my-requests/post'
import { alertMessage } from './../../../../../../hooks/commons/toast-alert'

const defaultData = {
    id_time: '',
    date: '',
    date_format: '',
    date_entry: '',
    hour_entry: '',
    new_hour_entry: '',
    hour_departure: '',
    reason: '',
}

const Notifications = props => {
    const [showAll, setShowAll] = useState(false)
    const [data, setData] = useState(defaultData)
    const [loadingOperation, setLoadinOperation] = useState(false)
    const [dataModal, setDataModal] = useState({
        open: false,
        titleModal: '',
        componentModal: '',
        dataRequest: {},
    })

    const handleInputChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }

    const toggleModal = (_, title, compont, dataRequest) => {
        const { fecha, fecha_format, fecha_entrada, hora_entrada, id_tiempo } = dataRequest || {}

        setDataModal({
            open: !dataModal.open,
            titleModal: title,
            componentModal: compont,
            dataRequest: dataRequest,
        })

        if (!dataModal.open) {
            if (compont === 'send-order')
                setData({
                    ...data,
                    id_time: id_tiempo,
                    date_entry: fecha_entrada,
                    date: fecha,
                    date_format: fecha_format,
                    hour_entry: hora_entrada,
                    new_hour_entry: hora_entrada,
                })
        } else setData(defaultData)
    }

    const { notifications, loadingNotifications } = useFetchGetNotifications()
    const { incorrectRecords, loadingIncorrectRecords, refreshIncorrectRecords } = useFetchGetIncorrectRecords({
        apiAccess,
    })

    const createRequest = async e => {
        e.preventDefault()
        setLoadinOperation(true)

        await postCreateRequestFromNotify({ apiAccessIncorrectRecords, data })
            .then(res => {
                alertMessage(res, toggleModal, refreshIncorrectRecords)
            })
            .catch(error => {
                console.log('API ERROR: ', error)
            })
        setLoadinOperation(false)
    }

    return (
        <Dropdown alignRight={!props.rtlLayout}>
            <Modal
                dataModal={dataModal}
                toggleModal={toggleModal}
                handleInputChange={handleInputChange}
                data={data}
                createRequest={createRequest}
                loadingOperation={loadingOperation}
            />
            <Dropdown.Toggle variant={'link'} id='dropdown-basic' className='down-icon'>
                <i className='icon feather icon-bell' />

                {(notifications.length > 0 || incorrectRecords.length > 0) && (
                    <span className={`${incorrectRecords.length > 0 ? 'dot-red' : 'dot-green'}`}></span>
                )}
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight className='notification'>
                <div className='noti-head'>
                    <h6 className='d-inline-block m-b-0'>Notificaciones</h6>

                    {/* <div className='float-right'>
                        <a href className='m-r-10'>
                        mark as read
                        </a>
                        <a href>clear all</a>
                    </div> */}
                </div>
                <ul className='noti-body'>
                    {/* #######################@@@@@@ORDERS@@@@@@######################### */}
                    {incorrectRecords.length > 0 && (
                        <li className='n-title'>
                            <h6 className='m-b-0 strong text-muted'>Olvidasde desloguearte?</h6>
                        </li>
                    )}
                    {incorrectRecords.map((item, index) => {
                        if (showAll || index < 4) {
                            return (
                                <NotifyRequests
                                    key={index}
                                    item={item}
                                    defaultIcons={defaultIcons}
                                    toggleModal={toggleModal}
                                />
                            )
                        } else {
                            return <></>
                        }
                    })}
                    {loadingIncorrectRecords && <div className='col-sm-12 text-muted h6 ml-2'>Cargando...</div>}

                    {/* #######################@@@@@@ORDERS@@@@@@######################### */}

                    {/* #######################@@@@@@NEWS@@@@@@######################### */}
                    {notifications.length > 0 && (
                        <li className='n-title'>
                            <h6 className='m-b-0 strong text-muted'>Sección de noticias!</h6>
                        </li>
                    )}
                    {notifications.map((item, index) => {
                        return <NotifyNews key={index} item={item} defaultIcons={defaultIcons} />
                    })}
                    {loadingNotifications && <div className='col-sm-12 text-muted h6 ml-2'>Cargando...</div>}
                    {/* #######################@@@@@@NEWS@@@@@@######################### */}

                    {incorrectRecords.length > 4 && (
                        <div className='noti-footer cursor'>
                            <a href onClick={() => setShowAll(!showAll)}>
                                {showAll ? 'Ver menos' : 'Ver todo'}
                            </a>
                        </div>
                    )}
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Notifications
