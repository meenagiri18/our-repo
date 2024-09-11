import React, { useState } from 'react'
import './route.css'
import Navbar from './navbar'

export default function RouteForm() {
  const [flocation, setFlocation] = useState('');
  const [tlocation, setTlocation] = useState('');

return (
    <div>
      <div><Navbar /></div>
      <div className='main-container2'>
        <div className='main2 container'>

          <form method="POST" action='http://127.0.0.1:8000/route/' >
            <div className='design3'>
              <div className='field2'>
                <label htmlFor='flocation'>From location</label>
                <input name="Flocation" id='flocation' type='text' value={flocation}
                  onChange={(e) => setFlocation(e.target.value)} required></input>
              </div>

              <div className='field2'>
                <label htmlFor='tlocation'>To location</label>
                <input name="Tlocation" id='tlocation' type='text' value={tlocation}
                  onChange={(e) => setTlocation(e.target.value)} required></input>
              </div>
              <div className='check'>
              <button type='submit'  className='btn btn-info'>Check</button>
              </div>
            </div>




          </form>


        </div>
      </div>
    </div>
  )
}
