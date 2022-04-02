import React, { useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { getDiverName, setDiverName, newDiver } from '../redusers/diverReduser';
import { addDiverToDive } from '../redusers/diveReduser';
import Creatable, { useCreatable } from 'react-select/creatable'
import {Button} from 'react-bootstrap'

const DiveTeam = ({planid, diversInDive}) =>{

  const [inEditMode, setInEditMode] = useState({
    status: false,
    cancelValue: null,
    diverId: null
  })
  const [existingTmp, setExistingTmp] =useState(null)

  const enableEdit = (event,diverId) =>{

    setInEditMode({status: true, cancelValue: diverId>-1?getDiverName(diverId,allDivers):'' ,diverId})
    if(event.target === 'li'){
      event.target.querySelector('input').focus()
    }
    /*if(event.target ==='button'){
      event.target.parent.querySelector('div').focus() 
    }*/
    console.log('tarketti',event.target)
  }

  const disableEdit = (event,diverId) =>{
    setInEditMode({status: false, diverId})
  }

  const dispatch = useDispatch()

  const allDivers = useSelector(state => state.divers)

 const createDiverId = (state =[]) =>{
  let newId=1
  if (state.length >0){
    console.log('statelen', state.length)
    newId=state[state.length-1].diverid+1
  }
  return Number(newId)
}

const diverObj =(name) => {
  return({name: name})
 }

 
const handleChange =(e,diverId) =>{
  dispatch(setDiverName({diverId, diverName: e.target.value}))
}
const handleKeyDown =(e,diverId)=>{
  if (e.key === 'Enter') {
    disableEdit(e,diverId)
  }
  if (e.key === 'Escape'){
    dispatch(setDiverName({diverId, diverName: inEditMode.cancelValue})) 
    disableEdit(e,diverId)
  }
}

const handleCreaKeyDown=(e)=>{
  console.log('key', e.key)
  if (e.key === 'Enter' || e.key ==='Tab') {
    console.log('creaEnter', e)
    if(existingTmp){
      dispatch(
        addDiverToDive(
          {planId: planid, diver: {name: existingTmp.label, diverid: existingTmp.value }}
        )
      )
      setExistingTmp(null)  
    }
  }
  if (e.key === 'Escape'){
    //dispatch(setDiverName({diverId, diverName: inEditMode.cancelValue})) 
    disableEdit(e,-1)
  }

}

const addExistingDiverToDive=(e)=>{
    setExistingTmp(e)
  console.log('addexistingdiver:', e )
  console.log('tmp:', existingTmp)

}

const addNewDiverToDive=  (e)=>{
  const newDiverObj = diverObj(e)
  newDiverObj.diverid =createDiverId(allDivers) 
  dispatch(newDiver(newDiverObj))
  dispatch(addDiverToDive({planId: planid, diver: newDiverObj}))
  

  console.log('addNewDiver:', e )  
}




 const inputEdit = (planId,diver) =>(
  <input type ='text' 
        name={diver.diverid}
        value={getDiverName(diver.diverid,allDivers)} 
        className="form-control"
        key={diver.diverid} 
        autoFocus
        onBlur={(event)=>{disableEdit(event,diver.diverid)}} 
        onChange={(e) =>handleChange(e,diver.diverid)}
        onKeyDown={(e =>handleKeyDown(e,diver.diverid))}
  />

)

const changeDiverInput =(planId,diverId) => (
  <input type='text' list='allDivers' value={getDiverName(diverId)} >
    <datalist id='allDivers'>
      {allDivers.map(diver =>
        <option value={diver.diverid}>{diver.name}</option>  
      )} 
    </datalist>
  </input>
)
  
//console.log('planid=',planid,'filtteri=', allDivers.filter((ad) => diversInDive.map(did => did.diverid).includes(ad.diverid) ===false ).map(({name, diverid}) =>({foo: name, baar: diverid})  ))

const optionsForCreatable =() =>(
  allDivers.filter((ad) => diversInDive.map(did => did.diverid).includes(ad.diverid) ===false ).map(({name, diverid}) =>({label: name, value: diverid})  )
)
 return(
  <ul>
  {diversInDive.map(diver => 
    <li key={diver.diverid} onClick={(e)=>enableEdit(e, diver.diverid) }>  
      { inEditMode.status && inEditMode.diverId === diver.diverid
        ? inputEdit(planid,diver)
        : <span>{getDiverName(diver.diverid,allDivers)}</span>
      }
    </li> )}
    <li key='-1' onClick={(e)=>enableEdit(e,-1)}>
    { inEditMode.status && inEditMode.diverId === -1
        ?<Creatable
          isClearable
          options={optionsForCreatable()}
          onChange={(e) =>addExistingDiverToDive(e)}
          onCreateOption={(e)=>addNewDiverToDive(e)}
          onKeyDown={(e =>handleCreaKeyDown(e))}
          onBlur={(event)=>{disableEdit(event,-1)}} 
          autoFocus
        />
        : <Button variant="outline-dark" size='sm' onClick={(e)=>{enableEdit(e,'addDiver')}} autoFocus>+</Button>}
    </li>
</ul>

 )

}


/* add new diver to diveteam -button
{ inEditMode.status && inEditMode.rowKey === 'addDiver'
    ?<li> <input type='text'
    name={`addDiver_${props.dive.planid}`} 
    onBlur={(event)=>{disableEdit(event,'addDiver')}} 
    onChange={(e)=>handleChange(e, 'addDiver', props.dive.planid )} 
    onKeyDown={(e)=>{handleKeyDown(e,'addDiver')}}
    className="form-control"
    autoFocus
    key = {`addDiver_?{props.dive.planid}`} /></li>
    :<li><Button variant="outline-dark" size='sm' onClick={(e)=>{enableEdit(e,'addDiver')}} autoFocus>+</Button></li>
}
 */

export default DiveTeam