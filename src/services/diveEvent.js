import axios from 'axios'

const baseUrl = 'http://localhost:3001/dives'

const getAll = async () =>{
  const responce = await axios.get(baseUrl)
  return responce.data
}

const createNew = async (content) => {
  const newObj ={
    content: content,
    votes: 0
  }
  const responce = await axios.post(baseUrl, newObj)
  return responce.data
}

const modifyOld = async (anecdote) =>{
 //const newData = {id: id, votes: votes} 
 const responce = await axios.put(`${baseUrl}/${anecdote.id}`,anecdote)
 console.log('modify BE', responce.data)
 return responce.data
}

export default {
  getAll,
  createNew,
  modifyOld
}