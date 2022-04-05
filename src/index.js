import ReactDOM from 'react-dom'
import App from './App';
import './App.css'

import {Provider} from 'react-redux'
import diveReduser from './redusers/diveReduser'
import diverReduser from './redusers/diverReduser';
import {configureStore} from '@reduxjs/toolkit'
//import store from './store';

const store = configureStore({
  reducer: {
    dives:  diveReduser,
    divers: diverReduser
  }
})


console.log(store.getState())


ReactDOM.render(
<Provider store={store}>  
    <App />
</Provider>, 
  document.getElementById('root')
);
