import React, {useEffect} from 'react'
import {fetchEmployeeThunk} from "../store/thunks"
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleEmployee = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const employee = useSelector((state)=>state.employee)
  useEffect(()=>{
    dispatch(fetchEmployeeThunk(id))
  },[id])
  return (
    <div>
      <h1>{employee.first_name} {employee.last_name}</h1>
      <p>Department : {employee.department}</p>
      <h4>{employee.first_name}'s Tasks</h4>
      <ul>
        {employee.tasks.map((task)=>{
          return <li key = {task.id}>
            {task.description}
          </li>
        })}
      </ul>

    </div>
  )
}

export default SingleEmployee
