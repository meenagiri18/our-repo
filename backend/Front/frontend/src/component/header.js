import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './header.css'


export default function Header() {
    return (

        <div className=' sub2 w-100' >
            
            <div>
                <Link to="/" className='heading' >ExpressTrack</Link>
            </div>
            <div className='d-flex listing'>
                <div>
                    <Link to="/" className='any' >Home</Link>
                </div>

                <div>
                    <Link to="/login" className='any'>About</Link>
                </div>
                <div>
                    <Link to="/login" className='any'>Start Shipment</Link>
                </div>
               
                <div>
                    <Link to="/login" className='any'>Tracking</Link>
                </div>
               
                <div>
                    <Link to="/login" className='any'>Route</Link>
                </div>

            </div>
            <div className=' btn'>
                <button><Link to="/login" className='log'>Login</Link></button>
                <button><Link to="/signup" className='log'>Sign up</Link></button>

            </div>


        </div>



    )
}
