
import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import conditional from '../../utils/conditional';
import { useModal } from '../../contexts/modal';
import axios from 'axios';

// usually use api wrapper stuff here but we only got 2 routes
const generateUrl = 'https://api.whatsmy.id/identifiers/generate';

const Generate = props => {

    const { data, dismiss } = useModal();

    const [identifier, setIdentifier] = useState('');
    
    useEffect(() => {
        reset();
        fetch();
    }, [data]);

    const reset = () => {
        setIdentifier('');
    };

    const fetch = async () => {
        try {
            const result = await axios.get(generateUrl);
            setIdentifier(result.data.result);
        } catch (e) {
            alert(e.message || 'Oops, we could not generate an identifier');
        }
    };

    const primaryClass = conditional('primary', style, { visible: true });

    return (
        <div className={style.Verify}>
            <div className={primaryClass}>
                <div className={style.intro}>
                    <p>Here's your new identifier</p>
                </div>
                <div className={style.content}>
                    <input 
                        className={style.field} 
                        value={identifier} 
                        onChange={e => setIdentifier(e.target.value)} />
                </div>
                <div className={style.actions}>
                    <button className={style.action} onClick={dismiss}>Done</button>
                </div>
            </div>
        </div>
    );

};

export default Generate;
