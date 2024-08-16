import React from 'react'
import Aboutimg from '../images/aboutimg.jpg'
import './about.css'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import Header from './header'


export default function About() {
  return (
    <div>

      <div><Header /></div>
      <div className='pt-5'>
        <div className='package'>
          <div className='explain'>
            <div className='head'><div>Welcome !!!</div><div className='text-primary'>To ExpressTrack</div></div>
            <h5> ExressTrack is your trusted partner in efficient and reliable courier management. Our platform is designed to simplify and optimize every step of the delivery process, making it easier for businesses to manage their operations. Whether you're a small business or a growing enterprise. At ExpressTrack, we’re here to help you deliver excellence, every time.</h5>
            <button className='btn-4'>Learn More</button>
          </div>
          <div className='picture2'>
            <img src={Aboutimg} alt='error' height={450} width={450}></img>
          </div>
        </div>

        <div className='footer_d'>
          <div className='footer'>
            <h8>Home</h8>
            <h8>About</h8>
            <h8>Parcel Creation</h8>
            <h8>Tracking</h8>
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
    </div>

  )
}
