import Dive from "./Dive"
import { useDispatch,useSelector } from "react-redux"
import { Table,Button } from 'react-bootstrap'
import { newDive } from "../redusers/diveReduser"



const DiveBoard = () => {


  const styleDur ={
    width: '150px'
  }

  const stylePlan ={
    wordWrap: 'break-word',
    width: '33%' 
  }

  const styleDiver ={
    wordWrap: 'break-word',
    width: '15%' 
  }

  const dispatch = useDispatch()

  const dives = useSelector(state => state.dives)
  console.log('dives', dives) 

  const addRow =()=>{
    dispatch(newDive())
  }

  return (
    <div>
    <Table striped bordered hover responsive='false'>
        <thead>
        <tr>
          <th style={styleDiver}>Divers</th>
          <th style={stylePlan}>Plan</th>
          <th style={styleDur}>Cave</th>
          <th style={styleDur}>Tot</th>
          <th>Start</th>
          <th>End</th>
        </tr>
        </thead>
        <tbody>
        {dives.map(dive =><Dive dive={dive} key={dive.planid} />  )}
        <tr>
          <td><Button onClick={()=>{addRow()}}>Add Dive</Button></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
    
    </div>
  )
}

export default DiveBoard