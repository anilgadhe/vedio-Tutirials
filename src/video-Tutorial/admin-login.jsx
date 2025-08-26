import { useFormik } from "formik"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import {useCookies} from 'react-cookie'
import { useEffect } from "react";

export function AdminLogin() {
     const [cookies , setCookie , removeCookie] = useCookies(['name']);
    const navigate = useNavigate();

     useEffect(()=>{
        var Cookie = navigator.cookieEnabled;

        if(Cookie){
            navigate("/admin-dashboard");
        }
     },[])

    const formik = useFormik({
        initialValues: {
            admin_id: "",
            password: "",
        },
        onSubmit: (admin) => {
            axios.get('http://localhost:3000/admin').then(respone => {
                var adminUser = respone.data.find(item => item.admin_id === admin.admin_id);

                if (adminUser) {
                    if (adminUser.password === admin.password) {
                        setCookie('admin_id',admin.admin_id,{expires: new Date('2025-08-27')});
                        navigate("/admin-dashboard")
                    } else {
                        alert("invalid password");
                    }
                } else {
                    alert("Invalid Admin Id");
                }
            })

        }
    });
    return (
        <div className=" d-flex justify-content-center">
            <form className="bg-light p-5" onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="admin_id">Admin Id</label>
                    <input type="text" id="admin_Id" className="form-control" name="admin_id" onChange={formik.handleChange} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="form-control" name="password" onChange={formik.handleChange} />
                </div>

                <button className="btn btn-warning m-2" type="submit">Login</button>
                <Link to="/" className="btn btn-danger"> Cancel </Link>
            </form>
        </div>
    )
}