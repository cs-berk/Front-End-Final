import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='page'>
      <h1> Employee Management System</h1>
      <div className='buttons'>
      <Link className='button' to={"/employees"}>All Employees</Link>
      <Link className='button' to={"/tasks"}>All Tasks</Link>
      </div>
      <img src={`${process.env.PUBLIC_URL}/ems.jpg` } alt = "homeimage" className='homeimage' />
    </div>
  )
}

export default HomePage
