import { useEffect, useState } from "react";
import Badge from  'react-bootstrap/Badge'
import { useSelector } from "react-redux";



const Countdown =({dive,counting}) => {

  const [myTimer,setMyTimer] = useState({visual: '--:--', value: 0})
  const [style,setStyle] =useState('secondary')

  const stopTimer = myTimer <0


  useEffect(() => {
    if(dive.start===0){console.log('nollaa pukkaa')
      setMyTimer({visual: '--:--', value: 0})
    }
  },[dive]) 

  useEffect(() => {
    
    if(dive.start >0 && counting >0){
    const timer = setTimeout(() => {
      const timeLeft= counting*60000 + dive.start - Date.now()
      const timeLeftHrs = timeLeft>0 ?Math.floor(timeLeft/(60*60*1000)) : Math.floor(timeLeft/(60*60*1000))+1
      const timeLeftMins =timeLeft>0 ? Math.floor((timeLeft%(60*60*1000))/60000) : Math.floor((timeLeft%(60*60*1000))/60000) +1
      const timeLeftSec = timeLeft>0 ? Math.floor( ((timeLeft%(60*60*1000))%60000)/1000 ) : Math.floor( ((timeLeft%(60*60*1000))%60000)/1000 ) + 1

      if(timeLeft>10000 *60){
        setStyle('secondary')
      }
      if(timeLeft <10000 *60){
        setStyle('warning')
      }
      if(timeLeft < 0){
        setStyle('danger')
      }
      console.log('timer running')
      //  setMyTimer(new Date( counting * 60*1000 + dive.start - Date.now()).toLocaleTimeString('fi-FI'))
      setMyTimer( {visual: `${timeLeftHrs} h ${timeLeftMins} m ${timeLeftSec} s`, value: timeLeft }  )
    }, 1000);
    return () => clearTimeout(timer);
  }},[dive,myTimer])

  

  //const dives = useSelector(state=>state.dives)
  //if(dive.start === 0){
  //  return (<></>)
  //}
  return(
    <div>
    <Badge pill bg={style}>
    <time>{ myTimer.visual}</time>
  </Badge>
  </div>
    
  )
}

export default Countdown