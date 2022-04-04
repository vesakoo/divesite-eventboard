import {createSlice} from '@reduxjs/toolkit'
//import AddDive from '../components/AddDive'
//import { useDispatch } from 'react-redux'

const testData = [
  {
    planid: 1,
    divers: [{name:'minna', diverid: 1}, { name: 'matti', diverid: 2}],
    plan: 'Kalterit, Helmi 10, Kalterit',
    cave_time: '40',
    tot_time: '90',
    start: 0,
    stop: 0
  },
  {
    planid: 2,
    divers: [{name: 'jukka', diverid: 3 }, { name: 'pekka', diverid: 4}],
    plan: '2x2, mario, keskikäytävä',
    cave_time: '40',
    tot_time: '90',
    start: 0,
    stop: 0
  }
]

const emptyDive ={
  planid: 0,
  divers: [],
  plan: 'Give Plan',
  cave_time: 0,
  tot_time: 0,
  start: 0,
  stop: 0
}

/*const diverObj =(name) => {
 return({name: name})
}*/



const createPlanId = (state =[]) =>{
  let newId=0
  if (state.length >0){
    console.log('statelen', state.length)
    newId=state[state.length-1].planid +1
  }
  return Number(newId)
}

/*const createDiverId = (state =[]) =>{
  let newId=0
  if (state.length >0 && state.divers.length >0){
    console.log('statelen', state.length)
    newId=state.divers[state.divers.length-1].diverid +1
  }
  return Number(newId)
}*/

  const diveSlice = createSlice({
    name: 'dives',
    initialState: testData,
    reducers: {
      newDive(state,action){
        console.log('statenimun',state)
        const nid= createPlanId(state)
        const newDive = {...emptyDive, planid: nid}
        state.push(newDive)
      },   
      setDiversInDive(state,action){
        console.log('action', action)
        const planId = action.payload.planId
        const divers =action.payload.divers
        const diveInState =state.find(dive => dive.planid === planId)
        diveInState.divers = divers
        state.filter(dive => dive.planid===planId? diveInState: dive)
      },
      addDiverToDive(state,action){
        console.log('addDiversToDive state:',state )
        const planId = action.payload.planId
        //const diver =diverObj(action.payload.diver)
        //diver.diverid = action.pa
        const diveInState =state.find(dive => dive.planid === planId)
        diveInState.divers.push(action.payload.diver)
      },
      modifyDiverInDive(state,action){
        //const planId = action.payload.planId
        //const diver =action.payload.diver
        //const diveInState =state.find(dive => dive.planid === planId)
        //diveInState.divers =[diver]
      },
      setPlanInDive(state ,action){
        console.log('action', action)
        const planId = action.payload.planId
        const newPlan = action.payload.plan
        const diveInState =state.find(dive => dive.planid === planId)
        diveInState.plan=newPlan
      },
      setCaveDurationInDive(state,action){
        const planId = action.payload.planId
        const newCavetime = action.payload.caveTime
        const diveInState =state.find(dive => dive.planid === planId)
        diveInState.cave_time=newCavetime

      },
      setTotalDurationInDive(state,action){
        const planId = action.payload.planId
        const newTotaltime = action.payload.totalTime
        const diveInState =state.find(dive => dive.planid === planId)
        diveInState.tot_time=newTotaltime

      },
      setStartTimeInDive(state,action){
        //console.log('action', action)
        const planId = action.payload.planId
        const newStarttime = action.payload.startTime
        const diveInState =state.find(dive => dive.planid === planId)
        diveInState.start=newStarttime
      },
      setStopTimeInDive(state,action){
        //console.log('action', action)
        const planId = action.payload.planId
        const newStoptime = action.payload.stopTime
        const diveInState =state.find(dive => dive.planid === planId)
        diveInState.stop=newStoptime
      }
    }
  })

  export const {
    newDive,
    setDiversInDive, 
    addDiverToDive,
    setPlanInDive,
    setCaveDurationInDive,
    setTotalDurationInDive,
    setStartTimeInDive,
    setStopTimeInDive 
  } =diveSlice.actions

export const foo = () => {
  return  dispatch => {
    const newDivers = [{name: 'jukka'},{name: 'maija'}]
    const diveId = 1
    dispatch(setDiversInDive({planId: diveId, divers: newDivers}))
  }
}
export const baar = (diveId,newDiver) => {
  return  dispatch => {
    dispatch(addDiverToDive({planId: diveId, diver: newDiver}))
  }
}

export const newDiveRow =() =>{
  return dispatch =>{
    dispatch(newDive())
  }
}


  export default diveSlice.reducer


