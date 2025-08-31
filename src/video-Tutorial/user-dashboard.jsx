import React, { createContext, useState } from 'react'
import { Vediodata } from './vedio-data';

export let userContext = createContext(null);

export function Userdashboard() {

  const[temp,setTemp]=useState('');
  const[searchInp , setSearchInp]=useState('');

function handleChange(e){
 setTemp(e.target.value);
}

function handleSearchClick(){
    setSearchInp(temp);
}

function handelChildData(e){

}

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid d-flex justify-content-evenly">
          <a className="navbar-brand" href="#">Navbar</a>
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
            <button className=' nav-item btn btn-warning bi bi-cart4'></button>
          </div>
        </div>
      </nav>

      <section>
          <userContext.Provider value={searchInp}>
             <Vediodata onChildClick={handelChildData}/>
          </userContext.Provider>
      </section>

    </div>
  )
}
