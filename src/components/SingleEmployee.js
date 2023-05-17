import React, {useEffect,useState} from 'react'
import {fetchEmployeeThunk,deleteTaskThunk,addTaskThunk} from "../store/thunks"
import { useSelector,useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const SingleEmployee = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const employee = useSelector((state)=>state.employee)
  const [description,setDescription] = useState("")
  const [priority_level,setPriority_level] = useState("")
  const [error,setError] = useState("")
  useEffect(()=>{
    dispatch(fetchEmployeeThunk(id))
  },[id ,dispatch])

  const handledelete = (id) => {
    dispatch(deleteTaskThunk(id))
  }
  const handlesubmit = (event) => {
    event.preventDefault()
    if(!description ) {
      setError("Description is required")
      return
    }
    console.log("testing")
    dispatch(addTaskThunk({description,priority_level ,employee_id : id}))
    setDescription("")
    setPriority_level("")
  }
  return (
    <div className='page'>
       <div className='Goback'>
        <Link to={"/employees"}>Go Back</Link>
      </div>
      {employee.first_name && (
        <>
      <h1>{employee.first_name} {employee.last_name}</h1>
      <p>Department : {employee.department}</p>
      <h4>{employee.first_name}'s Tasks</h4>
      <ul>
        {employee.tasks.map((task)=>{
          return <li key = {task.id}>
           <span>{task.description}</span>
           <button onClick={()=>handledelete(task.id)}>Delete</button>
           <button><Link to={`/tasks/${task.id}`}>See More</Link></button>
          </li>
        })}
      </ul>
      <form onSubmit={handlesubmit}>
        <h3> Add New Task</h3>
        <div>
          <label>Description</label>
          <input type='text' value = {description} onFocus={()=>setError("")} onChange={(event)=>setDescription(event.target.value)}/>
          {error && <span>{error}</span>}
        </div>
        <div>
          <label>Priority Level</label>
          <input type='number' value = {priority_level} onChange={(event)=>setPriority_level(event.target.value)}/>
        </div>
        <button type = "submit"> Submit </button>
      </form>
        </>
      )}

    </div>
  )
}

export default SingleEmployee
