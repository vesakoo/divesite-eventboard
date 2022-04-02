import {configureStore} from '@reduxjs/toolkit'
import diveReduser from './redusers/diveReduser'



const store = configureStore({
  reducer: {
    dives:  diveReduser
  }
})

export default store