import React, { createContext, useEffect, useState } from 'react'
import { Vediodata } from './vedio-data';
import store from '../store/store.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWatchLater } from '../slicers/slicer';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';



export let userContext = createContext(null);

export function Userdashboard() {

  const [temp, setTemp] = useState('');
  const [searchInp, setSearchInp] = useState('');
  const[userName,setUser]=useState("");

  function handleChange(e) {
    setTemp(e.target.value);
  }

 let  navigate =useNavigate();

  const Watchlater = useSelector(state => state.storeWatchedvedio);

  let dispatch = useDispatch();

  function handleRemoveFromWatchLater(id){
      dispatch(removeFromWatchLater(id));
  }

  function handleSearchClick() {
    setSearchInp(temp);
  }

  function handleLogout(){
    localStorage.removeItem("user");
      navigate("/user-login");
  }

  function handelChildData(e) {

  }

  useEffect(()=>{
   let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);

    if(!user){
        navigate("/user-login")
    }

  },[])

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid d-flex justify-content-evenly">
          <a className="navbar-brand" href="#">{userName.user_name}</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex input-group w-50" role="search">
              <input className="form-control" type="search" onChange={handleChange} placeholder="Search" aria-label="Search" />
              <button onClick={handleSearchClick} className="btn btn-warning bi bi-search" type="submit"></button>
            </div>
          </div>
          <div className='navbar-nav'>
            <button className=' nav-item btn btn-warning bi bi-save-fill position-relative' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
              <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{Watchlater.vediosCount}</span>
            </button>
          </div>
          <div className='navbar-nav mx-4'>
            <Button onClick={handleLogout} variant='contained' color='error'>Logout</Button>
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel"><span className='bi bi-stopwatch'></span> Watch Later <span>{Watchlater.vediosCount}</span>vedios </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {Watchlater.vedios.map((vedio)=>(
            <div className='row'>
              <div className='col-2'>{vedio.title}</div>
              <div className='col-2'><iframe src={vedio.url} title={vedio.title}></iframe></div>
              <div className='col-2'> <Button variant='contained' color='error' onClick={()=>{handleRemoveFromWatchLater(vedio.id)}}>Remove</Button></div>
            </div>
          ))}
        </div>
      </div>

      <section>
        <userContext.Provider value={searchInp}>
          <Vediodata onChildClick={handelChildData} />
        </userContext.Provider>
      </section>

    </div>
  )
}
