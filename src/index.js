import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { registerLicense } from '@syncfusion/ej2-base';
// import '@syncfusion/ej2-react-documenteditor/styles/material.css';

registerLicense("Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWX5dcHRWR2NfUUBwVkY=")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);