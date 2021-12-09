
import React, { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

export const ServerContext = createContext();
export const useServer = () => useContext(ServerContext);

const render = () => {
    if (typeof window == 'undefined') return;
    
    if (!window.initialData) {
        ReactDOM.render(<ServerContext.Provider value={{ route: '/', data: null }}><App /></ServerContext.Provider>, document.getElementById('root'));
        console.log('Client app rendered using mock data');
        return;
    }
    
    ReactDOM.hydrate(<ServerContext.Provider value={window.initialData}><App /></ServerContext.Provider>, document.getElementById('root'));
    console.log('Client app rendered using SSR data');    
};

render();