import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { registerLicense } from '@syncfusion/ej2-base';
// import '@syncfusion/ej2-react-documenteditor/styles/material.css';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf0x0TXxbf1x0ZFJMYFpbRHRPMyBoS35RckViW35ed3RTRmJVU0Bx")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);