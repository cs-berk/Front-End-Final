import React, {useEffect,useState} from 'react'
import {fetchAllEmployeesThunk,fetchAllTasksThunk, deleteTaskThunk, addTaskThunk} from "../store/thunks"
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Tasks = () => {
  const dispatch = useDispatch()
  const [description,setDescription] = useState("")
  const [priority_level,setPriority_level] = useState("")
  const [employee_id,setEmployee_id] = useState("")
  const [error,setError] = useState("")
  const [priority_error,setpriorityerror] = useState("")
  const tasks = useSelector((state)=>state.allTasks)
  const employees = useSelector((state)=>state.allEmployees)
  useEffect(()=>{
    dispatch(fetchAllEmployeesThunk())
    dispatch(fetchAllTasksThunk())
  },[dispatch])
  const handledelete = (id) => {
    dispatch(deleteTaskThunk(id))
  } 
  const handlesubmit = (event) => {
    event.preventDefault()
    if(!description ) {
      setError("Description is required")
      return
    }
    if(!priority_level ) {
      setpriorityerror("Priority is required")
      return
    }
    console.log("testing")
    dispatch(addTaskThunk({description,priority_level ,employee_id : employee_id ? employee_id : null}))
    setDescription("")
    setPriority_level("")
    setEmployee_id("")
  }
  return (
    <div className='page'>
       <div className='Goback'>
        <Link to={"/"}>Go Back</Link>
      </div>
      <h1> All Tasks </h1>
      {tasks.length > 0 ? (
        
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Priority Level</th>
            <th>Employee Name</th>
            <th>Completed</th>
            <th>Details </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task)=>{
            return <tr className='row' key={task.id}>
              <td>{task.description}</td>
              <td>{task.priority_level}</td>
              <td>{task.employee_id ? `${task.employee.first_name} ${task.employee.last_name}` : 'unassigned' }</td>
              <td>{task.completion_status ? "Yes":"No" } </td>
              <td><Link to ={`/tasks/${task.id}`}>Read more</Link></td>
              <td> <button onClick={()=>handledelete(task.id) }>Delete</button></td>
            </tr>
          })}
        </tbody>
      </table>
      ):<p> There are no task</p>}
      <form onSubmit={handlesubmit}>
        <h3> Add New Task</h3>
        <div>
          <label>Description</label>
          <input type='text' value = {description} onFocus={(event)=>setError("")} onChange={(event)=>setDescription(event.target.value)}/>
          {error && <span>{error}</span>}
        </div>
        <div>
          <label>Priority Level</label>
          <input type='number' value = {priority_level} onFocus={(event)=> setpriorityerror("")} onChange={(event)=>setPriority_level(event.target.value)}/>
          {priority_error && <span>{priority_error}</span>}
        </div>
        <div>
          <label>Employee</label>
          <select value={employee_id} onChange={(event)=>setEmployee_id(event.target.value)}>
            <option>Choose Employee</option>
            {employees.map((employee)=>{
              return <option value ={employee.id} key = {employee.id}> {employee.first_name} {employee.last_name} </option>
            })}
          </select>
        </div>
        <button type = "submit"> Submit </button>
      </form>
    </div>
  )
}

export default Tasks
