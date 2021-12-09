
import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import conditional from '../../utils/conditional';
import { useModal } from '../../contexts/modal';
import axios from 'axios';

const verifyUrl = 'https://api.whatsmy.id/identifiers/verify';

const Verify = props => {

    const { data, dismiss } = useModal();

    const [identifier, setIdentifier] = useState('');
    const [status, setStatus] = useState('pending');
    const [pending, setPending] = useState(false);
    
    useEffect(() => {
        reset();
    }, [data]);

    const reset = () => {
        setIdentifier('');
        setStatus('pending');
        setPending(false);
    };

    const verify = async () => {
        setPending(true);

        try {
            const result = await axios.post(verifyUrl, { identifier });
            setStatus(result.data.valid ? 'valid' : 'invalid');
        } catch (e) {
            alert(e.message || 'Oops, we could not verify this identifier');
        }

        setPending(false);
    };

    const primaryClass = conditional('primary', style, { visible: status === 'pending' });
    const secondaryClass = conditional('secondary', style, { visible: ['valid', 'invalid'].includes(status) });
    const verifyClass = conditional('action', style, { main: true, pending });

    return (
        <div className={style.Verify}>
            <div className={primaryClass}>
                <div className={style.intro}>
                    <p>Verify your identifier</p>
                </div>
                <div className={style.content}>
                    <input 
                        className={style.field} 
                        value={identifier} 
                        onChange={e => setIdentifier(e.target.value)} 
                        placeholder={'Enter your identifier...'} />
                </div>
                <div className={style.actions}>
                    <button className={verifyClass} onClick={verify}>Verify</button>
                    <button className={style.action + ' ' + style.cancel} onClick={dismiss}>Cancel</button>
                </div>
            </div>
            <div className={secondaryClass}>
                <div className={style.intro}>
                    <p>{status === 'valid' ? '😎 Nice, this identifier is valid!' : '🧐 Hmm, doesn\'t look valid to us'}</p>
                </div>
                <div className={style.actions}>
                    <button className={style.action} onClick={dismiss}>Done</button>
                </div>
            </div>
        </div>
    );

};

export default Verify;
