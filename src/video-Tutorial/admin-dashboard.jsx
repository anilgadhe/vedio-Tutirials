import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


export function AdminDashboard() {
    let navigate = useNavigate();
    const [vedios, setVedio] = useState([{ id: null, title: null, description: null, url: null, comment: null, likes: 0, dislike: 0, category_id: 0 }])

    function loadVedio() {
        axios.get('http://localhost:3000/videos').then(async response => setVedio(await response.data))
    }
    useEffect(() => {
        var Cookie = navigator.cookieEnabled;
        if (Cookie === undefined) {
            navigate("/admin-login");
        } else {
            loadVedio();
        }
    }, [])

    return (
        <div className="bg-light p-4">

            <div className="d-flex justify-content-between ">
                <span className="fs-3">
                    Dashboard</span>
                <button className="btn btn-link">Logout</button>
            </div>
            <div >
                 <Link to="/add-vedio" className="bi bi-camera bg-success  btn btn-light">Add vedio</Link>
            </div>
            <div>
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
                            vedios.map((vedio,i)=>(
                                <tr key={i}>
                                   <td>{vedio.title}</td>
                                   <td>
                                    <iframe height="150" width="200" title="Youtube vedio" src={vedio.url}></iframe>
                                   </td>
                                   <td>
                                    <button className="btn btn-warning bi bi-pen"></button>
                                    <button className="btn btn-danger bi bi-trash mx-2"></button>
                                   </td>
                                </tr>
                            ))
                         }
                    </tbody>

                </table>
            </div>
        </div>
    )

}