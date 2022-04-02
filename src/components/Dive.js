import React, { useState} from 'react'
//import {Accordion} from 'react-bootstrap'
//import { TextField } from '@mui/material'
//import { getDiverName,newDiver } from '../redusers/diverReduser';
import { //foo,
  setPlanInDive,
  //baar,
  setCaveDurationInDive,
  setTotalDurationInDive,
  setStartTimeInDive,
  setStopTimeInDive,
  //addDiverToDive
} from '../redusers/diveReduser'

import DiveTeam from './DiveTeam';
import { useDispatch, useSelector } from 'react-redux';
import {Button} from 'react-bootstrap'

//import TimePicker from 'react-time-picker'

const Dive = (props) =>{

  const [inEditMode, setInEditMode] = useState({
    status: false,
    cancelValue: null,
    colKey: null,
  })

  const [includeInputVal, setIncludeInputVal] =useState(false)
  const dispatch = useDispatch()

  const tdStyle =(errors)=>{
    if(errors){
      return ({borderColor: 'pink', borderWidth: 'thick'})
    }
  }



  const inputEdit = (fieldType,planId,defaultVal,extraClass ='') =>(
    <input type={fieldType==='cavedur' || fieldType === 'totdur'?'number' :'text'} 
          name={`${fieldType}_${planId}`}
          min='0' max={8*60*60}
          value={defaultVal>0? defaultVal:null} 
          onBlur={(event)=>{disableEdit(event,fieldType)}} 
          onChange={(e)=>handleChange(e, fieldType, planId )} 
          onKeyDown={(e)=>{handleKeyDown(e,fieldType)}}
          //placeholder='0'
          className="form-control"
          key={planId} autoFocus />

  )

    const inputStartTime=() =>{
       
      return(
        <>
        {inEditMode.status && inEditMode.colKey==='startTime'
            ?<div>{includeInputVal
                ?<input type='time' key={props.dive.planid}
                  onChange={(e)=>handleStartTime(e, 'editStartTime', props.dive.planid )}
                  value=  {new Date(new Date(props.dive.start).setSeconds(0)).toLocaleTimeString() }
                  //pattern='[0-9]{2}:[0-9]{2}'
                  className="form-control"
                />
                :<input type='time' key={props.dive.planid}
                    onChange={(e)=>handleStartTime(e, 'editStartTime', props.dive.planid )}
                    //pattern='[0-9]{2}:[0-9]{2}'
                    className="form-control"
                 />
                }
              <Button value='0:0:0' onClick={(e)=>handleStartTime(e,'editStartTime', props.dive.planid) }>
                Reset Dive
              </Button>
              </div>
              
            : <time onClick={(event)=>{enableEdit(event,'startTime')}}>
                { new Date(props.dive.start).toLocaleTimeString('fi-FI')}
              </time> 
            }{console.log('rendering...')}
        </>

      )
      

    }
  
  //todo add cancell
  const enableEdit = (event,colKey) =>{
       //console.log('enable:', inEditMode, event)
    if(inEditMode.status !== true || inEditMode.colKey !== colKey){
      setInEditMode({status: true, colKey: colKey})
    }
    if(event.target === 'td'){
      event.target.querySelector('input').focus()
    }
    if(colKey === 'startTime'){
      setIncludeInputVal(true)
    }
  }

  //todo add cancell
  const disableEdit = (event,colKey) =>{
    //console.log('disableEdit, rowkey= ', colKey,'event=', event)
    if(inEditMode.status !== false || inEditMode.colKey !== colKey){
      setInEditMode({status: false, colKey: colKey}) 
    }
    if(colKey === 'cavedur' && event.target.value==='' ){
      dispatch(setCaveDurationInDive({planId: props.dive.planid, caveTime: 0 }))
    }
    if(colKey === 'totdur' && event.target.value===''){
      dispatch(setTotalDurationInDive({planId: props.dive.planid, totalTime: 0 }))    
    }
    if(colKey === 'startTime' && includeInputVal){
      setIncludeInputVal(false)
    }

  }

  const handleKeyDown =(e,colKey)=>{
    if (e.key === 'Enter') {
      disableEdit(e,colKey) 
    }
  }

  const handleChange =(e,field, planid) =>{
    //console.log('handleChange: e',e,'field:',field,'planid',planid)
    if(e.target.value === undefined)
      return
    if(field === 'plan'){
      dispatch(setPlanInDive({planId: planid, plan: e.target.value }))
    }
    if(field === 'cavedur'){
      const nval= e.target.value
      dispatch(setCaveDurationInDive({planId: planid, caveTime: nval }))
    }
    if(field === 'totdur'){
      const nval= e.target.value
      dispatch(setTotalDurationInDive({planId: planid, totalTime: nval }))
      if(props.dive.start >0){
        const stop = props.dive.start + 60 * e.target.value *1000
        dispatch(setStopTimeInDive({planId: planid, stopTime: stop }))
      }
    }
    if(field ==='start'){
      const start =Date.now()
      const stop =  props.dive.tot_time*60*1000 + start
      dispatch(setStartTimeInDive({planId: planid, startTime: start }))
      dispatch(setStopTimeInDive({planId: planid, stopTime: stop }))
      
    }
  }

  const handleStartTime =(e) => {
    if(includeInputVal){
      setIncludeInputVal(false)
   }
  if(e.target.value){
      const start = e.target.value !=='0:0:0'? new Date().setHours(...e.target.value.split(':')):0
      const stop =e.target.value !=='0:0:0'? props.dive.tot_time*60*1000 + start:0
      dispatch(setStartTimeInDive( {planId: props.dive.planid , startTime: start } )) 
      dispatch(setStopTimeInDive({planId: props.dive.planid , stopTime:  stop }))
     
    }  
  }

  return (
    <tr>
      <td style={tdStyle(props.dive.divers.length <2)}>
        <DiveTeam planid={props.dive.planid} diversInDive = {props.dive.divers} />
      </td>
       <td onClick={(event)=>{enableEdit(event,'plan')}} 
          onBlur={(event)=>{disableEdit(event,'plan')}} 
          style={tdStyle(props.dive.plan ==='' || props.dive.plan ==='Give Plan' )}>
        {inEditMode.status && inEditMode.colKey === 'plan'
      ? <textarea type='text'
          name={`plan_${props.dive.planid}`}
          value={props.dive.plan} 
          onBlur={(event)=>{disableEdit(event,'plan')}} 
          onChange={(e)=>handleChange(e, 'plan', props.dive.planid )}
          onKeyDown={(e)=>{handleKeyDown(e,'plan')}} 
          className="form-control"
          key={props.dive.planid} autoFocus />
      : <span>{props.dive.plan}</span>
      }</td>

      <td onClick={(event)=>{enableEdit(event,'cavedur')}} >
        { inEditMode.status && inEditMode.colKey==='cavedur'
        ? inputEdit('cavedur',props.dive.planid,props.dive.cave_time)
        : <span>{props.dive.cave_time}  </span> }
      </td>
      <td onClick={(event)=>{enableEdit(event,'totdur')}}  
          style={tdStyle(props.dive.tot_time <5 || props.dive.tot_time < props.dive.cave_time)} 
      >
        { inEditMode.status && inEditMode.colKey==='totdur'
        ? inputEdit('totdur',props.dive.planid,props.dive.tot_time)
        : <span>{props.dive.tot_time} </span> }
      </td> 
      <td  onClick={(event)=>{ if(props.dive.start>0 && !(inEditMode.status && inEditMode.colKey==='startTime')){
                       enableEdit(event,'editStartTime')} 
                    }}  >
        { props.dive.start ===0 && !(inEditMode.status && inEditMode.colKey==='startTime')
        ? < Button onClick={(e) =>{handleChange(e,'start',props.dive.planid)}}>Start</Button>
        : <div>
            {inputStartTime()}
          </div>
        } 
      </td>
      <td>{ props.dive.stop >0 
            ?<span>{new Date(props.dive.stop).toLocaleTimeString('fi-FI') }</span>
            : <span>0</span>}
      
      </td>
    </tr>
  )

 
  
}


export default Dive
