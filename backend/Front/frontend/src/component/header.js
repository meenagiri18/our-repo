import React from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'


export default function Header() {
  return (
    
    <div className=' sub2 w-100' >
        <div className='heading'>ExpressTrack</div>
        <div className='d-flex listing'>
            <div>
                <Link to="/homepage" className='any' >Home</Link>
            </div>

            <div>
                <Link to="/about" className='any'>About</Link>
            </div>

            <div>
                <Link to="/api/create_parcel" className='any'>Parcel Creation</Link>
            </div>
            <div>
                <Link to="/tracking" className='any'>Tracking</Link>
            </div>
            

        </div>
        <div className=' btn'>
            <button><Link to="/login" className='log'>Login</Link></button>
            <button><Link to="/signup" className='log'>Sign up</Link></button>

        </div>
        
      
    </div>
    

    
  )
}
