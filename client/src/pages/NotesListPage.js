import React, { useContext, useEffect, useState } from 'react'
import notes from '../assets/data'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

import { AuthContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../baseUrl.js';

const NotesListPage = () => {
  let [notesList, setNotesList] = useState([])
  const {cookie, generateToast} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect( ()=>{
    const token = cookie.token;
    
    const fetchData = async () =>{
      const response = await fetch(`${BASE_URL}/api/v1/notes`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })

      
      const data = await response.json();
      if(response.status =='401'){
        generateToast("You are not Authorized to access this", "info");
        navigate("/")
      }
      else{
        setNotesList(data);
      }
      
    }
    fetchData();
    
  },[])

  

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>Notes</h2>
        <p className='notes-count'>{notesList.length}</p>
      </div>

      <div className='notes-list'>

        {notesList && notesList.map((note)=>{
          
            return <ListItem key={note._id} note={note}  />
          })}

      </div>

      <AddButton/>
    </div>
  )
}

export default NotesListPage
