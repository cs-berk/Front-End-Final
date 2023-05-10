import React, {useEffect,useState} from 'react'
import {fetchAllEmployeesThunk, deleteEmployeeThunk, addEmployeeThunk} from "../store/thunks"
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Employees = () => {
  const dispatch = useDispatch()
  const [first_name,setFirst_name] = useState("")
  const [last_name,setLast_name] = useState("")
  const [department,setDepartment] = useState("")
  const employees = useSelector((state)=>state.allEmployees)
  useEffect(()=>{
    dispatch(fetchAllEmployeesThunk())
  },[dispatch])
  const handledelete = (id) => {
    dispatch(deleteEmployeeThunk(id))
  } 
  const handlesubmit = (event) => {
    event.preventDefault()
    console.log("testing")
    dispatch(addEmployeeThunk({first_name,last_name,department}))
    setFirst_name("")
    setLast_name("")
    setDepartment("")
  }
  return (
    <div>
      <h1> All Employees </h1>
      {employees.length > 0 ? (
        
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>Details </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee)=>{
            return <tr key={employee.id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.department}</td>
              <td><Link to ={`/employees/${employee.id}`}>Read more</Link></td>
              <td> <button onClick={()=>handledelete(employee.id) }>Delete</button></td>
            </tr>
          })}
        </tbody>
      </table>
      ):<p> There are no employee</p>}
      <form onSubmit={handlesubmit}>
        <h3> Add New Employee</h3>
        <div>
          <label>First Name</label>
          <input type='text' value = {first_name} onChange={(event)=>setFirst_name(event.target.value)}/>
        </div>
        <div>
          <label>Last Name</label>
          <input type='text' value = {last_name} onChange={(event)=>setLast_name(event.target.value)}/>
        </div>
        <div>
          <label>Department</label>
          <input type='text' value = {department} onChange={(event)=>setDepartment(event.target.value)}/>
        </div>
        <button type = "submit"> Submit </button>
      </form>
    </div>
  )
}

export default Employees
