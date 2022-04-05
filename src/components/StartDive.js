import { useState,useEffect } from "react";
import {Button} from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { setStartTimeInDive } from "../redusers/diveReduser";


const StartDive = ({initTime,planId}) =>{

const [value, setValue] = useState("0:00");
const [startDive, setStartDive] = useState(false)
const [editMode,setEditMode] = useState(false)


const dispatch = useDispatch()

const handleStartDive =() =>{
  const startTime = Date.now()
  console.log()
  setStartDive(true)
  setValue( new Date(startTime).toLocaleTimeString() )
  dispatch(setStartTimeInDive({planId, startTime  }))
}

const onChange = (event) => {
  setValue(event.target.value);
  console.log('onChange value', event.target.value)
};

const onBlur = (event) => {
  const value = event.target.value;
  const seconds = Math.max(0, getSecondsFromHHMMSS(value));
  const time = toHHMMSS(seconds);
  setValue(time);
  setEditMode(false)
  console.log(time)
  //const start = e.target.value !=='0:0:0'? new Date().setHours(...e.target.value.split(':')):0
  const startTime = time !=='0:0:0'? new Date().setHours(...time.split(':')):0
  dispatch(setStartTimeInDive({planId, startTime  }))

};

const onCancelStart =()=>{
  dispatch(setStartTimeInDive({planId, startTime: 0  }))
  setStartDive(0)
  setValue("0:00")
  console.log('Cancelling...')

}

const getSecondsFromHHMMSS = (value) => {
  const [str1, str2, str3] = value.split(":");

  const val1 = Number(str1);
  const val2 = Number(str2);
  const val3 = Number(str3);

  if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
    return val1;
  }

  if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
    return val1 * 60 + val2;
  }

  if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
    return val1 * 60 * 60 + val2 * 60 + val3;
  }

  return 0;
};

const toHHMMSS = (secs) => {
  const secNum = parseInt(secs.toString(), 10);
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor(secNum / 60) % 60;
  const seconds = secNum % 60;

  return [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val))
    .filter((val, index) => val !== "00" || index > 0)
    .join(":")
    .replace(/^0/, "");
};

const style={
  width: '100%',
  height: '100%'
}

return (
  <td onClick={() =>{ if(startDive && !editMode){ setEditMode(true)} } } >{startDive?
  <span>{editMode
    ? <input type="text" onChange={onChange} onBlur={onBlur} value={value} autoFocus  /> 
    : <div style={style}  >{value}{' '} <Button variant="secondary" size="sm" onClick={onCancelStart}>Cancel start</Button>  </div> 
  }</span>
  : <Button onClick={()=>{handleStartDive()}} variant="secondary" size="sm">Start</Button>}</td>
);


}
export default StartDive