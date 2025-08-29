import React, { useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import *as yup from 'yup'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export function Userregister() {
   let navigate = useNavigate();
  const[classn, setClassn]=useState("");
  const[msg ,setMsg]= useState("");
  const[btnd ,setBtnd]=useState("");
 
  function handleVerifyusrId(e){
    axios.get("http://localhost:3000/users").then(response =>{

      for(var user of response.data){
        if(user.user_id === e.target.value){
           setClassn("text-danger");
            setMsg("user_id is not available");
            setBtnd("d-none");
            break;
        }
        else{
          setClassn("text-success");
          setMsg("user_id is available");
          setBtnd("d-block")
        }
      }
    })
  }

  const formik = useFormik({
    initialValues: {
      user_id: '',
      user_name: "",
      password: '',
      email: '',
    },
    onSubmit: (user) => {

      axios.post("http://localhost:3000/users", user).then(response => {
        console.log(response.data);
        alert("registerd successfully")
        navigate("/user-login")

      }).catch((err) => {
        console.log("failed to register a user:", err);

      })
    },
    validationSchema: yup.object({
      user_id: yup.string().required("user_id is required"),
      user_name: yup.string().required("user_Name is required"),
      password: yup.string().required("password is required"),
      email: yup.string().required("Email is required")
    })
  })
  return (
    <div className='bg-light w-50 p-3'>
      <h2>User-Register</h2>

      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>User_Id</dt>
          <dd><input onChange={formik.handleChange} onKeyUp={handleVerifyusrId} name='user_id' className='form-control' type='text' /></dd>
          <dd className={classn}>{msg}</dd>
          <dd className='text-danger'>{formik.errors.user_id}</dd>

          <dt>User Name</dt>
          <dd><input onChange={formik.handleChange} name='user_name' className='form-control' type='text' /></dd>
          <dd className='text-danger'>{formik.errors.user_name}</dd>


          <dt>Password</dt>
          <dd><input onChange={formik.handleChange} name='password' className='form-control' type='password' /></dd>
          <dd className='text-danger'>{formik.errors.password}</dd>


          <dt>Email</dt>
          <dd><input onChange={formik.handleChange} name='email' className='form-control' type='email' /></dd>
          <dd className='text-danger'>{formik.errors.email}</dd>

        </dl>
        <div>
          <button className={`btn btn-warning w-50 ${btnd}`} disabled={!formik.isValid} type='submit'>Register</button>

        </div>
        <Link className="btn btn-link" to="/user-login">Already have account ?</Link>
      </form>
    </div>
  )
}
