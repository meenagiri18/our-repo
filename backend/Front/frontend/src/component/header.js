import React from 'react'
import Images from '../images/elogo.png'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'


export default function Header() {
  return (
    <div className='container-fluid d-flex justify-content-between bg-info' >
        <div>
            <img src={Images} alt='error' height={60} width={55}></img>

        </div>
        <div className='d-flex listing'>
            <div>
                <Link to="" className='any' >Home</Link>
            </div>

            <div>
                <Link to="" className='any'>About</Link>
            </div>

            <div>
                <Link to="" className='any'>Parcel Creation</Link>
            </div>
            <div>
                <Link to="" className='any'>Tracking</Link>
            </div>
            

        </div>
        <div className='d-flex btn'>
            <button><Link to="/login">Login</Link></button>
            <button>Sign up</button>

        </div>
        
      
    </div>
  )
}
