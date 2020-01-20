import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({ children, open, onClose }) => {
    return (
        <ReactModal
            isOpen={open}
            onRequestClose={onClose}
            style={{
                content: {

                }
            }}
        >
            { children }
        </ReactModal>
    );
};

export default Modal;