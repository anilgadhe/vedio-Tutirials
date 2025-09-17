import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import *as yup from 'yup'

export function Userlogin() {

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user_id: '',
      password: ''
    },
    onSubmit: (user) => {
      axios.get('http://localhost:3000/users').then(response => {
        var result = response.data.find(item => item.user_id ===  user.user_id)
           
        if(result){
          if(result.password === user.password){
            localStorage.setItem("user", JSON.stringify(result));
             navigate("/user-dashboard");
          }else{
            alert("invalid password");
          }
        }else{
          alert("invalid userId")
        }
      }
      )
    },
    validationSchema:yup.object({
      user_id: yup.string().required("userId is required"),
      password:yup.string().required("password is required"),
    })
  })

  useEffect(()=>{
    let user = JSON.parse(localStorage.getItem("user"))
    if(user){
      navigate("/user-dashboard")
    }
  },[])

  return (
    <div className='bg-light w-50 p-3 '>
      <h2>User-Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>User_Id</dt>
          <dd><input name='user_id' value={formik.values.user_id} className='form-control' type='text' onChange={formik.handleChange} /></dd>
          <dd className='text-danger'>{formik.errors.user_id}</dd>
 
          <dt>password</dt>
          <dd><input type='password' className='form-control' value={formik.values.password} name='password' onChange={formik.handleChange} /></dd>
          <dd className='text-danger'>{formik.errors.password}</dd>
        </dl>
        <div>
          <button className='btn btn-primary w-25' type='submit'>Login</button>
        </div>

        <Link className='btn btn-link w-25' to="/user-register">New User ?</Link>
      </form>
    </div>
  )
}
