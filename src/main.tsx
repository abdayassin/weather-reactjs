import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Importez Provider de 'react-redux'
import store from './store'; // Assurez-vous d'importer votre magasin Redux correctement
import App from './App.tsx';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> {/* Enveloppez votre application avec Provider et passez le store Redux */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
