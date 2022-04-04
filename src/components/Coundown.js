import { useEffect, useState } from "react";
import Badge from  'react-bootstrap/Badge'
import { useSelector } from "react-redux";



const Countdown =({dive,counting}) => {

  const [myTimer,setMyTimer] = useState('--:--')
  const [style,setStyle] =useState('secondary')

  const stopTimer = myTimer <0


  useEffect(() => {
    if(dive.start >0 && counting >0){
    const timer = setTimeout(() => {
      const timeLeft= counting*60000 + dive.start - Date.now()
      const timeLeftHrs = Math.floor(timeLeft/(60*60*1000))
      const timeLeftMins =Math.floor((timeLeft%(60*60*1000))/60000)
      const timeLeftSec = Math.floor( ((timeLeft%(60*60*1000))%60000)/1000 )

      if(timeLeftMins <10){
        setStyle('warning')
      }
      if(timeLeftMins < 0){
        setStyle('danger')
      }

      setMyTimer(new Date( counting * 60*1000 + dive.start - Date.now()).toLocaleTimeString('fi-FI'))
      setMyTimer( `${timeLeftHrs} h ${timeLeftMins} m ${timeLeftSec} s`  )
    }, 1000);
    return () => clearTimeout(timer);
  }},[dive.start,myTimer])

  //const dives = useSelector(state=>state.dives)
  if(dive.start === 0){
    return (<></>)
  }
  return(
    <div>
    <Badge pill bg={style}>
    <time>{ myTimer}</time>
  </Badge>
  </div>
    
  )
}

export default Countdown