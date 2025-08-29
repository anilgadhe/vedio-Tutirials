import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";


export function AdminDashboard() {
    let location = useLocation();
    let navigate = useNavigate();
     const [cookies , setCookie , removeCookie] = useCookies(['admin_id']);
    const [vedios, setVedio] = useState([{ id: null, title: null, description: null, url: null, comment: null, likes: 0, dislike: 0, category_id: 0 }])

    function loadVedio() {
        axios.get('http://localhost:3000/videos').then(async response => setVedio(await response.data))
    }
    useEffect(() => {
        var Cookie = navigator.cookieEnabled;
        if (cookies.admin_id === undefined) {
            navigate("/admin-login");
        } else {
            loadVedio();
        }
    }, [vedios])

    const isLocation= location.pathname.includes("add-vedio") || location.pathname.includes("edit-vedio") || location.pathname.includes("delete-vedio");

     function handleLogoutClick(){
         removeCookie("admin_id");

            navigate("/admin-login")

     }

    return (
        <div className="bg-light p-4">

            <div className="d-flex justify-content-between ">
                <span className="fs-3">
                   {cookies.admin_id}`s Dashboard</span>
                <button onClick={handleLogoutClick} className="btn btn-link">Logout</button>
            </div>
            <div >
                <Link to="add-vedio" className="bi bi-camera bg-success  btn btn-light">Add vedio</Link>
            </div>
            <div className="row">
                <div className={isLocation ?"col-12 col-lg-5 col-md-12":"col-12"}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>title</th>
                                <th>Priview</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                vedios.map((vedio, i) => (
                                    <tr key={i}>
                                        <td>{vedio.title}</td>
                                        <td>
                                            <iframe height="150" width="200" title="Youtube vedio" src={vedio.url}></iframe>
                                        </td>
                                        <td>
                                            <Link to={`edit-vedio/${vedio.id}`} className="btn btn-warning bi bi-pen"></Link>
                                            <Link to={`delete-vedio/${vedio.id}`} className="btn btn-danger bi bi-trash mx-2"></Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
                <div className={isLocation ? "col-12 col-lg-7 col-md-12" :"col-0"}>
                    <Outlet />
                </div>
            </div>
        </div>
    )

}