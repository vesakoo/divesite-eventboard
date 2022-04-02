import {createSlice} from '@reduxjs/toolkit'

const testData = [
  {name:'minna', diverid: 1}, 
  { name: 'matti', diverid: 2},
  {name: 'jukka', diverid: 3 }, 
  { name: 'pekka', diverid: 4}
]
/*
const createDiverId = (state =[]) =>{
  let newId=1
  if (state.length >0){
    console.log('statelen', state.length)
    newId=state[state.length-1].diverid+1
  }
  return Number(newId)
}
*/

const diverObj =(name) => {
  return({name: name})
 }

const diverSlice = createSlice({
  name: 'divers',
  initialState: testData,
  reducers: {
    newDiver(state,action){
      //const diver = diverObj(action.payload)
      //diver.diverid = createDiverId(state)
      state.push(action.payload)
    },
    setDiverName(state,action){
      const diverId = action.payload.diverId
      const diverName = action.payload.diverName
      const diverInState = state.find(diver => diver.diverid ===diverId)
      diverInState.name = diverName
    }
  }
})
export const {
  newDiver,
  setDiverName
}
=diverSlice.actions

export const getDiverName = (diverId,diverState) =>{
  const diverInState = diverState.find(diver => diver.diverid ===diverId)
  return diverInState.name 
}

export default diverSlice.reducer

