import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";

export function DeleteVedio(){
    let navigate = useNavigate();
    let params = useParams();
    const [info ,setInfo] = useState({title:null, description:null, url:null});

    function loadVedio(){
        axios.get(`http://localhost:3000/videos/${params.id}`).then(response =>{
            console.log(response.data);
            setInfo(response.data)
             
        }).catch((err)=>{
            console.log("failed to load",err);
            
        })
    }

    function handleYesClick(){
        axios.delete(`http://localhost:3000/videos/${params.id}`).then(response=>{
            console.log(response.data);
            alert("Vedio deleted successfully");
            navigate("/admin-dashboard")
        })
    }

    useEffect(()=>{
      loadVedio()
    },[params.id])

    return(
        <div>
            <div>Are you sure ?</div>

            <div>
                <dl>
                    <dt>Title</dt>
                    <dd>{info.title}</dd>
                    <dt>Priview</dt>
                    <dd><iframe height="200" width="200" src={info.url}></iframe></dd>
                    <dt>description</dt>
                    <dd>{info.description}</dd>
                </dl>
            </div>
            <div>
                <button className="btn btn-warning" onClick={handleYesClick}>yes</button>
                <Link className="btn btn-warning mx-2" to="/admin-dashboard">NO</Link>
            </div>
        </div>
    )
}