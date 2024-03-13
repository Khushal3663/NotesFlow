import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { AuthContext } from '../App';
import { BASE_URL } from '../baseUrl.js';
import generateToast from '../App.js'


const NotePage = () => {
  const {cookie, generateToast} = useContext(AuthContext);
  const [note, setNote] = useState({
    title:"Title", body:"Note"
  })
  let id =useParams().id ;

  let navigate = useNavigate();

  useEffect(()=>{
    getNote();
  },[])

  const getNote = async ()=>{
    
    if(id == "new") return;
    try {
      const response = await fetch(`${BASE_URL}/api/v1/notes/${id}`,{
        method:'GET',
        headers:{
          'Authorization': `Bearer ${cookie.token}`
        }});
      const data = await response.json();
      setNote(data);
    } catch (error) {
      generateToast("Some Error occured",'error')
    }
    
    
    
  }




  const updateNote = async ()=>{
    

    try {
      const response = await fetch(`${BASE_URL}/api/v1/notes/${note._id}`, {
        method : "PUT",
        headers:{
          'Authorization': `Bearer ${cookie.token}`,
          'Content-Type':"application/json"
        },
        body: JSON.stringify({...note})
      })
      const data = await response.json()
    } catch (error) {
      generateToast("Some Error occured",'error')
    }
    
  }
  
 

let createNote = async()=>{
  try {
    await fetch(`${BASE_URL}/api/v1/notes/`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.token}`
      },
      body: JSON.stringify(note)
    });
  } catch (error) {
    generateToast("Some Error occured",'error')
  }
}


let handleSubmit= ()=>{
  
  if(id === "new" && note.body !== "Note"){
      createNote();
  }
  else if(id !== "new" && note.title == ""){
    deleteNote();
  }
  else if(id !== "new"){
    updateNote();
  }
  navigate('/');
}

const deleteNote = async ()=>{
  
  try {
    await fetch(`${BASE_URL}/api/v1/notes/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.token}`
      },
      body: JSON.stringify(note)
    })
  } catch (error) {
    generateToast("Some Error occured",'error')
  }
  navigate('/');
}

let handleChange =(e)=>{
  
  if(e.target.name == 'title'){
    setNote(() => {
      return ({...note, 'title' : e.target.value })
    });
  }
  else{
    setNote(() => {
      return ({...note, 'body' : e.target.value })
    });
  }
  
}

  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/">
              <ArrowLeft onClick={handleSubmit} />  
          </Link>
        </h3>
        {id === "new"? <button onClick={handleSubmit}>Done</button> : <button onClick={deleteNote}>Delete</button>}
        
      </div>
        <h1><input name="title" onChange={handleChange } value={note?.title}></input></h1>
        <textarea onChange={handleChange } value={note?.body}>

        </textarea>
      
    </div>
  )
}

export default NotePage
