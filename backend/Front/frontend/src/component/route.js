import React from 'react'
import './route.css'
import Navbar from './navbar'

export default function RouteForm() {
  return (
    <div>
        <div><Navbar/></div>
        <div className='main-container2'>
            <div className='main2'>
            
      <form  method = 'POST' action = "">
        <div className='design3'>
            <div className='field'>
                <label htmlFor='Flocation'>From location</label>
                <input name = "Flocation" id='flocation' type='text' required></input>
            </div>
            <div className='field'>
                <label htmlFor='Tlocation'>To location</label>
                <input name = "Tlocation" id='Tlocation' type='text' required></input>
            </div>
        </div>
        <div>
            <button type='summit'>Check</button>
        </div>

      </form>
      </div>
      </div>
    </div>
  )
}
