import { useState,useEffect } from "react";
import {Button} from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { setStopTimeInDive} from "../redusers/diveReduser";


const StopDive = ({initTime,planId}) =>{

const [value, setValue] = useState("0:00");
const [stopDive, setStopDive] = useState(false)
const [editMode,setEditMode] = useState(false)

/*useEffect(() => {
  setEditMode()
},[initTime]) 
*/
const dispatch = useDispatch()

const handleStopDive =() =>{
  const stopTime = Date.now()
  console.log()
  setStopDive(true)
  setValue( new Date(stopTime).toLocaleTimeString() )
  dispatch(setStopTimeInDive({planId, stopTime: stopTime  }))
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
  const stopTime = time !=='0:0:0'? new Date().setHours(...time.split(':')):0
  dispatch(setStopTimeInDive({planId, stopTime: stopTime  }))

};

const onCancelStop =()=>{

  const confirmed = window.confirm("Cancel dive stop?");
  if(!confirmed){
    return
  }
  dispatch(setStopTimeInDive({planId, stopTime: 0  }))
  setStopDive(0)
  setValue("0:00")
  console.log('Cancelling stop...')

}

const getSecondsFromHHMMSS = (value) => {
  value = value.replace(/\./g,':')
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
  <td onClick={() =>{ if(stopDive && !editMode){ setEditMode(true)} } }>
    <div>{initTime} (planned)</div>
    {stopDive
      ?<span><hr/>
        {editMode
          ? <input type="text" onChange={onChange} onBlur={onBlur} value={value} autoFocus  /> 
          : <div style={style}  >{value}{' '} (actual)<br/> <Button variant="secondary" size="sm" onClick={onCancelStop}>Cancel stop</Button>  </div> 
        }
      </span>
    :<span>{initTime?<Button onClick={()=>{handleStopDive()}} variant="secondary" size="sm">Stop</Button> :''}</span>
    }
  </td>
);

console.log('init:',initTime)

}
export default StopDive