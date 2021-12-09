
import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import conditional from '../../utils/conditional';

import Modal from '../Modal';
import Generate from '../Generate';
import Verify from '../Verify';

const App = props => {

    const [animated, setAnimated] = useState(true);

    const [generate, setGenerate] = useState(null);
    const [verify, setVerify] = useState(null);

    useEffect(() => {
        setTimeout(() => { setAnimated(false) }, 1800);
    }, []);

    // yano cause whatsmy.id might become a thing ;)
    const shortcuts = [
        {
            identifier: 'generate',
            title: 'Generate',
            description: 'Get your identifier in seconds',
            animation: 'a',
            action: () => setGenerate({})
        },
        {
            identifier: 'verify',
            title: 'Verify',
            description: 'Check for a valid identifier',
            animation: 'b',
            action: () => setVerify({})
        }
    ];

    const item = data => {
        const base = conditional('option', style, { animated });
        const optionClass = base + ' ' + style[data.animation];

        return (
            <div className={optionClass} key={data.identifier} onClick={data.action}>
                <div className={style.icon + ' ' + style[data.identifier]} />
                <div className={style.info}>
                    <div className={style.title}>{data.title}</div>
                    <div className={style.description}>{data.description}</div>
                </div>
            </div>
        );
    };

    return (
        <div className={style.App}>
            <div className={style.content}>
                <div className={style.intro}>
                    <p>Hey there, how can we help?</p>
                </div>
                <div className={style.options}>
                    {shortcuts.map(item)}
                </div>
            </div>
            <Modal data={generate} onDismiss={() => setGenerate(null)}>
                <Generate />
            </Modal>
            <Modal data={verify} onDismiss={() => setVerify(null)}>
                <Verify />
            </Modal>
        </div>
    );

};

export default App;
