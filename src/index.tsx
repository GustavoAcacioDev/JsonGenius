import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Router/routing';
import React from 'react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
