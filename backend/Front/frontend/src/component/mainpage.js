

import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MdOutlineTrackChanges } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { LuPackagePlus } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { MdBusinessCenter } from "react-icons/md";
import { RiTimeZoneLine } from "react-icons/ri";
import { IoPeople } from "react-icons/io5";
import Homepageimg from '../images/homepageimg.jpg'
import { useEffect, useState } from 'react';
import Navbar from './navbar';
import Footer from './footer'




export default function Mainpage() {
  const [district, setDistrict] = useState(0);
  const [clients, setClients] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [business, setBusiness] = useState(0);

  useEffect(() => {
    setDistrict((district) => district + 1);
    setClients((clients) => clients + 1);
    setDelivery((delivery) => delivery + 1);
    setBusiness((business) => business + 1);

    if (district === 77) {
      setDistrict(77);
    }

    if (clients === 250) {
      setClients(250);
    }

    if (delivery === 350) {
      setDelivery(350);
    }

    if (business === 6) {
      setBusiness(6);
    }




  }, [district, clients, delivery, business])
  return (
    <div>
      <div><Navbar /></div>

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
        <div>
          <div className='description'>
            <div className=' topic text-primary' >About us</div>
            <h6>ExpressTrack is easy-to-use courier management system designed to make your delivery process smooth and efficient. Whether you’re a small business or a large logistics company, our platform helps you manage and track parcels with accuracy and reliability. From order processing to customer notifications, ExpressTrack simplifies every step, ensuring your deliveries are always on time.</h6>
          </div>
          <button className='btn1 w-25'><Link className='text-white text-decoration-none' to='/about'>Read More</Link></button>
        </div>
        <div className='picture'>
          <img src={Homepageimg} alt='error' width={600} height={400}></img>
        </div>
      </div>

      <div className='thirdheader'>
        <div className='design'>
          <RiTimeZoneLine className=' imp ' />
          <p>{district}</p>
          <p>Districts covered</p>
        </div>
        <div className='design'>
          <IoPeople className='w-50 h-50' />
          <p>{clients}k</p>
          <p>Happy clients</p>
        </div>

        <div className='design'>
          <MdDeliveryDining className='w-50 h-50' />
          <p>{delivery}k</p>
          <p>Good delivery</p>
        </div>
        <div className='design'>
          <MdBusinessCenter className='w-50 h-50' />
          <p>{business}+</p>
          <p>Business year</p>
        </div>
      </div>
      <div className='fourthheader'>
        <div className='description_box'>
        <div className=' topic text-primary' >Why us? </div>
          <p>ExpressTrack is the ultimate solution for businesses seeking to optimize their delivery operations with ease and precision. Our platform stands out by offering a robust tracking system that ensures transparency and reliability at every step of the delivery process. With features like parcel tracking, automated customer notifications, and comprehensive order management, ExpressTrack not only streamlines your workflow but also enhances customer satisfaction. Whether you're managing a local delivery service or a large logistics network, ExpressTrack adapts to your needs, helping you reduce errors, improve efficiency, and grow your business with confidence. Choose ExpressTrack and experience the difference in seamless, stress-free courier management.
          </p>
        </div>

      </div>
      <div><Footer/></div>
    </div>

  )
}

