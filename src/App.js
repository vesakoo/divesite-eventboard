import DiveBoard from './components/DiveBoard'
//import {foo,baar,newDive} from './redusers/diveReduser'
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'

function App() {
  const dispatch = useDispatch()
  useEffect(() =>{
    //anecdoteService.getAll().then(notes =>
    //  dispatch(setAnecdotes(notes))
   // )
   //dispatch(foo())
   //dispatch(baar(1,'Martti'))
   //dispatch(baar(2,'Vertti'))
   //dispatch(newDive())
  },[dispatch])

  return (
   <div><DiveBoard /></div>
  );
}

export default App;
