import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss'
export const Modal = ({onClose, open}) =>
    open
        ? ReactDOM.createPortal(
        <div className='overlay-modal'>
            <div className='modal'>
                <div className="modal__close" onClick={onClose}>&times;</div>
                <h3 className='modal__title'>Simple site about countries</h3>
                <p>This site will be updated whenever possible.</p>
                <p className='mail'><a href="mailto:berlitio600@gmail.com" className='mail__link'>Contact me on email</a></p>
            </div>
        </div>,
        document.body
        )
        : null;
