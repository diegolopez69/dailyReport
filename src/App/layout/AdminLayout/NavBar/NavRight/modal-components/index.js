import React from 'react'
import { Modal } from 'react-bootstrap'
import SendRequest from './send-request'

const ModalModule = ({ dataModal, toggleModal, handleInputChange, data, createRequest, loadingOperation }) => {
    const { open, titleModal, componentModal } = dataModal

    return (
        <>
            <Modal
                centered
                show={open}
                onHide={toggleModal}
                dialogClassName='modal-50w'
                aria-labelledby='example-custom-modal-styling-title'
            >
                <Modal.Header closeButton>
                    <Modal.Title id='example-custom-modal-styling-title'>{titleModal}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {loadingDetailForDays && <p className='text-center'>Cargando...</p>} */}
                    {componentModal === 'send-order' && (
                        <SendRequest
                            dataModal={dataModal}
                            handleInputChange={handleInputChange}
                            data={data}
                            createRequest={createRequest}
                            loadingOperation={loadingOperation}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalModule
