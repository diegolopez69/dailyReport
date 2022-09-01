import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

const SendOrder = ({ handleInputChange, data, createRequest, loadingOperation }) => {
    const { new_hour_entry, hour_departure, date_entry, reason } = data

    return (
        <form onSubmit={createRequest}>
            <Col md={12} className={loadingOperation ? 'text-center' : 'hidden'}>
                Cargando...
            </Col>

            <Col md={12} className='mb-2'>
                <Form.Label className='strong p'>Fecha: {date_entry}</Form.Label>
            </Col>

            <div className={false && 'hidden'}>
                <Col md={12}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='expiredDate'>
                                <Form.Label>Hora de entrada</Form.Label>
                                <Form.Control
                                    required
                                    className='pill'
                                    name='new_hour_entry'
                                    type='time'
                                    value={new_hour_entry}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId='expiredDate'>
                                <Form.Label>Hora de salida</Form.Label>
                                <Form.Control
                                    required
                                    min={hour_departure}
                                    className='pill'
                                    name='hour_departure'
                                    type='time'
                                    value={hour_departure}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>

                <Col md={12}>
                    <Row>
                        <Col md={12}>
                            <Form.Group controlId='description'>
                                <Form.Label>Motivo</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    as='textarea'
                                    rows='3'
                                    placeholder='Motivo de la corrección'
                                    className='pill'
                                    name='reason'
                                    value={reason}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>

                <Col md={12} className='text-right mt-2'>
                    <Button variant='primary' className='pill' type='submit'>
                        <i className='fa fa-send' />
                        Enviar
                    </Button>
                </Col>

                <Col md={12} className='mt-2'>
                    <p className='text-muted'>
                        *Una vez enviada la solicitud, podrás ver el estado en "Mis solicitudes".
                    </p>
                </Col>
            </div>
        </form>
    )
}

export default SendOrder
