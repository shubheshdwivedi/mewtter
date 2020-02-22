import React from 'react';
import './App.scss';
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/es/integration/react';
import redux from "../redux/store/store";
import Router from "../connect/router";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const AppStyle = {
        height: '100vh',

    };
  return (
    <div className="App" style={AppStyle}>
      <Provider store={redux.store}>
        <PersistGate loading={null} persistor={redux.persist}>
            <Router/>
            <ToastContainer newestOnTop />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
