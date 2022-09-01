import React from 'react'
import { useHistory } from 'react-router-dom'

const NotifyRequests = ({ item, defaultIcons, toggleModal }) => {
    const history = useHistory()
    const { fecha, estado } = item

    return (
        <li className='notification'>
            <div className='media'>
                <img
                    className='img-radius'
                    src={defaultIcons[estado ? 'guino' : 'triste'] || defaultIcons.default}
                    alt='Img'
                />
                <div className='media-body'>
                    <p>
                        <strong>Fecha: {fecha}</strong>

                        {estado ? (
                            <span className='n-time text-muted'>
                                <button
                                    className='btn btn-gray btn-pill strong p'
                                    type='button'
                                    onClick={() => history.push('/mis-solicitudes', item)}
                                >
                                    <li className='fa fa-eye' style={{ padding: '0px 3px' }} />
                                    Ver
                                </button>
                            </span>
                        ) : (
                            <span className='n-time text-muted cursor'>
                                <button
                                    className='btn btn-warning btn-pill'
                                    type='button'
                                    onClick={() =>
                                        toggleModal('', 'Solicitud de corrección de horas', 'send-order', item)
                                    }
                                >
                                    <li className='fa fa-send' style={{ padding: '0px 12px' }} />
                                </button>
                            </span>
                        )}
                    </p>
                    {estado ? (
                        <p className='text-success strong'>Solicitud enviada!</p>
                    ) : (
                        <p className='text-muted'>Envía una solicitud para corregir esto!</p>
                    )}
                </div>
            </div>
        </li>
    )
}

export default NotifyRequests
