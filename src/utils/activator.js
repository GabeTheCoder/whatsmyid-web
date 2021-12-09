
import { useRef } from 'react';

export const useActivator = () => {
    
    const ref = useRef();
    const content = useRef();
    
    const activate = active => {
        const events = active ? 'auto' : 'none';
        ref.current.style.touchAction = events;
        ref.current.style.pointerEvents = events;

        if (active) {
            content.current.style.overflow = 'hidden';
            content.current.scrollTop = 0;
            content.current.style.overflow = 'scroll';
        }
    };

    return [ref, content, activate];

};
