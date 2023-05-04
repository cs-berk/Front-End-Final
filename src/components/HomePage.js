import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h1> This is my final project!</h1>
      <Link to={"/employees"}>All Employees</Link>
      <Link to={"/tasks"}>All Tasks</Link>
    </div>
  )
}

export default HomePage
