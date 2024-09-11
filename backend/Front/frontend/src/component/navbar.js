import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <div className=' sub2 container-fluid d-flex justify-content-between'>
                <div>
                    <Link to="/" className='heading' >ExpressTrack</Link>
                </div>

                <div className='d-flex listing'>
                    <div>
                        <Link to="/" className='any' >Home</Link>
                    </div>

                    <div>
                        <Link to="/about" className='any'>About</Link>
                    </div>
                    <div>
                        <Link to="/shipment" className='any'>Start Shipment</Link>
                    </div>
                    <div>
                        <Link to="/track" className='any'>Tracking</Link>
                    </div>
                    <div>
                        <Link to="/contact" className='any'>Contact Us</Link>
                    </div>
                    <div>
                        <Link to="/route" className='any'>Route</Link>
                    </div>


                </div>
            </div>
        </div>
    )
}
