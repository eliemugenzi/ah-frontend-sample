import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bulma/css/bulma.min.css';
import MainRouter from './components/Router';
import './App.css';

const App=()=> {
  return (
    <div className="App">
      <MainRouter/>
      <ToastContainer/>
    </div>
  );
}

export default App;
