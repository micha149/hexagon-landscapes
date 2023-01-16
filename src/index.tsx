import { createRoot } from 'react-dom/client';
import React from 'react'
import App from './components/App';

const container = document.getElementById('root');

if (!container) {
    throw Error('Could not find app container to render');
}

const root = createRoot(container);
root.render(<App />);
