import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Tabela from './components/TabelaDoc';

ReactDOM.render(
  <React.StrictMode>
    <Tabela />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
