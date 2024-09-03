import React from 'react'
import './footer.css'
import { FaFacebookSquare, FaGithubSquare,  FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import {Link} from "react-router-dom"

export default function Footer() {
  return (
    <div>
      <div className='footer_d'>
        <div className='footer'>
        <div>
                <Link to="/homepage" className='any' >Home</Link>
            </div>

            <div>
                <Link to="/about" className='any'>About</Link>
            </div>
            <div>
                <Link to="/shipment" className='any'>Start Shipment</Link>
            </div> 

            <div>
                <Link to="/api/create_parcel" className='any'>Parcel Creation</Link>
            </div>
            <div>
                <Link to="/api/track_parcel" className='any'>Tracking</Link>
            </div>
        </div>
        <div className='footer2'>
          <FaFacebookSquare className='iconimg' />
          <FaInstagramSquare className='iconimg' />
          <FaSquareXTwitter className='iconimg' />
          <FaGithubSquare className='iconimg' />
        </div>
        <div className='footer3'>© Copyright 2020, All rights reserved</div>
      </div>
    </div>
  )
}
