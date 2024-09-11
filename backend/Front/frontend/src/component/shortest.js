import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbar from './navbar'
import Footer from './footer'
import './shortest.css'


export default function Shortest() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/route_api/'
      // headers:{
      //   'Content-Type':'application/json',
      // },
    ).then((response) => {
      const index = response.data;
      const lastindex = index.length - 1;
      setData(index[lastindex])



    })
      .catch(console.log('Error'))



  }, [])

  return (
    <>
      <Navbar />
      <div className='mainpage2'>
        <div>


          {data && (
            <div className="result">
              <h3>Shortest Distance: {data.shortest_distance} km</h3>
              <h3>Shortest Path: {data.path} </h3>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  )
}
