import React from 'react'
import './footer.css'
import { FaFacebookSquare, FaGithubSquare,  FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import {Link} from "react-router-dom"

export default function Footerhome() {
  return (
    <div>
        <div className='footer_d'>
        <div className='footer'>
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
        <div className='footer2'>
          <Link to= 'https://www.facebook.com/'><FaFacebookSquare className='iconimg' /></Link>
          <Link to= 'https://www.instagram.com/'><FaInstagramSquare className='iconimg' /></Link>
          <Link to= 'https://www.twitter.com/'><FaSquareXTwitter className='iconimg' /></Link>
          <Link to= 'https://www.github.com/'><FaGithubSquare className='iconimg' /></Link>
        </div>
        <div className='footer3'>© Copyright 2020, All rights reserved</div>
      </div>
      
    </div>
  )
}
