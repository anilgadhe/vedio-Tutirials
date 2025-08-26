import { Link } from "react-router-dom";



export function Home(){
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
            <Link className="btn btn-warning" to="admin-login">Admin Login</Link>
            <Link className="btn btn-light mx-4">User Login</Link>
        </div>
    )
}