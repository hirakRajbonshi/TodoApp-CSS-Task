import { useState } from 'react'
import { useEffect} from 'react'
import {TextField, IconButton} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import './App.css'


function App() {
  const [todo,setTodo] = useState("")
  const [description,setDescription] = useState("")
  const [todos, setTodos] = useState([]);

  function Todo(todo){  
    return(
      <div className="todo">
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <IconButton  onClick={()=>{
        var path = "http://localhost:3000/todos/" + todo.id;
        fetch(path,{
          method : "DELETE"
        }).then((res)=>{
          res.json().then((data)=>{
            setTodos(data);
          })
        })
      }}>
      <DeleteIcon sx={{color:"#ef2222"}}/>
      </IconButton> 
      </div>
    )
  }

  useEffect(()=>{
    fetch("http://localhost:3000/todos",{
      method : "GET"
    }).then((res)=>{
      res.json().then((data)=>{
        setTodos(data)
      })
    })
  },[])

  return (
    <>
    <div style={{width:"33em", margin:"5em"}}>
      <h2 style={{fontSize : "2em"}}>Todo List</h2>
      <div id='todo-entry'>
        <TextField variant='standard' placeholder="Title"
          onChange={(val)=>{
            setTodo(val.target.value)
          }}
          margin='dense'
          style={{backgroundColor : "#444", borderRadius : "10px",padding : "10px", paddingLeft:"23px"}}
          
          sx={{ input: { color: '#dddddd' } }}
          InputProps={{
            disableUnderline : true
          }}
        ></TextField>
        <TextField variant='standard' placeholder="Todo Description"
          onChange={(val)=>{
            setDescription(val.target.value)
          }}
          multiline
          rows={5}
          margin='normal'
          style={{backgroundColor : "#444", borderRadius : "10px",padding : "15px", paddingLeft:"23px"}}
          sx={{ textarea : { color: '#dddddd' } }}
          InputProps={{ 
            disableUnderline : true
          }}
        ></TextField>
        <button onClick={()=>{
          fetch("http://localhost:3000/todos",{
            method : "POST",
            body : JSON.stringify({
              title : todo,
              description : description
            }),
            headers : {
              "Content-type" : "application/json"
            }
          }).then((res)=>{
            res.json().then((data)=>{
              setTodos(current => [...current,data])
            })
          })
        }}>Add Todo</button>
      </div>
    </div>
    <div style={{display:"flex", flexWrap:"wrap",justifyContent:"left"}}>
      {todos.map((todo)=>
        {
          return <Todo title= {todo.title} description={todo.description} id={todo.id}></Todo>
        })
      }
    </div>
    </>
  )
}



export default App
