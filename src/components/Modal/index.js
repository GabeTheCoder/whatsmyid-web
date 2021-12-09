
import React, { useState, useEffect, useRef } from 'react';
import style from './style.module.css';
import conditional from '../../utils/conditional';
import { useActivator } from '../../utils/activator';
import { ModalContext } from '../../contexts/modal';

const Modal = props => {

    const [activator, content, activate] = useActivator();
    const [data, setData] = useState(null);

    const presented = useRef(false);
    
    useEffect(() => {
        if (!props.data) return;
        presented.current = true;

        activate(true);
        setData(props.data);
    }, [props.data]);

    const dismiss = () => {
        presented.current = false;

        activate(false);
        props.onDismiss();

        setTimeout(() => {
            if (presented.current) return;
            setData(null);
        }, 500);
    };

    const modalClass = conditional('Modal', style, { visible: props.data });

    return (
        <div className={modalClass} ref={activator}>
            <div className={style.content} ref={content}>
                <ModalContext.Provider value={{ data, setData, dismiss }}>
                    {props.children}
                </ModalContext.Provider>
            </div>
        </div>
    );

};

export default Modal;
