import React, {useEffect, useState} from 'react'
import {fetchTaskThunk, fetchAllEmployeesThunk, editTaskThunk}from "../store/thunks"
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const SingleTask = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const dispatch = useDispatch()
  const task = useSelector((state)=>state.task)
  const [description,setDescription] = useState("")
  const [priority_level,setPriority_level] = useState("")
  const [employee_id,setEmployee_id] = useState("")
  const [completion_status,setCompletion_status] = useState(false)
  const employees = useSelector((state)=>state.allEmployees)
  useEffect(()=>{
    dispatch(fetchTaskThunk(id))
    dispatch(fetchAllEmployeesThunk())
  },[id,dispatch])
  useEffect(()=>{
    if (task) {
      setDescription(task.description)
      setPriority_level(task.priority_level)
      setEmployee_id(task.employee_id)
      setCompletion_status(task.completion_status)

    }
  }, [id,task.id])
  const handlesubmit =  (event) => {
    event.preventDefault()
    console.log("testing")
    dispatch(editTaskThunk({description,priority_level ,employee_id : employee_id ? employee_id : null,id ,completion_status}))
    navigate("/tasks")
    
  }
  return (
    <div>
      <h1>{task.description}</h1>
      <p>Priority Level  : {task.priority_level}</p>
      <h4>Assigned to {task.employee_id ? `${task.employee.first_name} ${task.employee.last_name}` : 'unassigned' }</h4>
      <form onSubmit={handlesubmit}>
        <h3> Edit Task</h3>
        <div>
          <label>Description</label>
          <input type='text' value = {description} onChange={(event)=>setDescription(event.target.value)}/>
        </div>
        <div>
          <label>Priority Level</label>
          <input type='number' value = {priority_level} onChange={(event)=>setPriority_level(event.target.value)}/>
        </div>
        <div>
          <label>Completion Status</label>
          <input type='checkbox' checked = {completion_status} onChange={(event)=>setCompletion_status(event.target.checked)}/>
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

export default SingleTask