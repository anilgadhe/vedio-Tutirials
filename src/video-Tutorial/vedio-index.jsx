import './vedio-index.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Home } from './home'
import { AdminLogin } from './admin-login'
import { AdminDashboard } from './admin-dashboard'
import { AddVedio } from './Add-vedio'
import {EditVedio} from './edit-vedio'
import { DeleteVedio } from './delete-vedio'


export function VedioIndex() {

  return (
    <div className="container-fluid bg-img">
      <BrowserRouter>
        <header className="text-center">
          <div className="text-white fs-2 fw-bold pt-3">
            <Link className="bi bi-door-closed" to="/"></Link> Vedio-Tutorial
          </div>
          <div className='text-white' >
            [react,Aws,Java]
          </div>
        </header>
        <section className='mt-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='admin-login' element={<AdminLogin />} />
            <Route path='admin-dashboard' element={<AdminDashboard />}>
              <Route path="add-vedio" element={<AddVedio />} />
              <Route path='edit-vedio/:id' element={<EditVedio />} />
              <Route path='delete-vedio/:id' element={<DeleteVedio />} />
            </Route>
            <Route path='*' element={<h1 className='text-center text-white'>
              404 page Not Found</h1>}/>
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  )
}