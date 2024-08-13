import React from 'react'
import Header from './header'
import './homepage.css'
import { MdOutlineTrackChanges } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { LuPackagePlus } from "react-icons/lu";



export default function Homepage() {
  return (
    <div>
      <div><Header /></div>
      <div className='content'>


        <div className='content1'>
          <div className='mainheader'>Welcome to ExpressTrack</div>
          <div className='secondheader'>Your reliable courier management solution.</div>
        </div>
        <div className='feature'>
          <div className='feature2'>
            <LuPackagePlus className='w-50 h-50' />
            <p className='paragraph'>CREATE PARCEL</p>
          </div>
          <div className='feature2'>
            <FaShippingFast className='w-50 h-50' />
            <p className='paragraph'>SHIPMENT</p>
          </div>
          <div className='feature2'>
            <MdOutlineTrackChanges className='w-50 h-50' />
            <p className='paragraph'>TRACK</p>
          </div>
        </div>
      </div>
<div className='section3'>
<div className='footer'>ExpressTrack Couriers Pvt. Ltd. was established in 2018 by Mrs. Meena Giri with Kriti Bhattrai who have over a decade of experience in their respective field. Today, ExpressTrack is the leading and the largest network courier service provider in Nepal covering self-network of more than 130 service stations around Nepal with strong ad well set-up delivery structure in Kathmandu valley. The Company is running with an advanced and scientific management using world class technology and having quality manpower.</div>
<button className='btn1 w-25'>Read More</button>
</div>
    </div>
  )
}
