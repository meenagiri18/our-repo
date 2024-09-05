import React from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import './shipment.css'
import Footer from './footer'


export default function Shipment() {
  return (
    <div>
      <Navbar />
      <div className='main-container'>

        <div className='border border-2 main'>
          <div className='section'>
            <p className='container'>Sender Details</p>
            <hr></hr>
            <Form method='POST' action='http://127.0.0.1:8000/shipment/'>
              <div className='design2'>

                <div className='field'>
                  <label htmlFor="name">Name</label>
                  <input className='' name="name" id="name" type="text" required></input>
                </div>


                <div className='field'>

                  <label for="address"> Sender address</label>
                  <input className='' name="address" id="address" type="text" required></input>

                </div>
              </div>
              <div className='design2'>

                <div className='field'>
                  <label for="email">Email</label>
                  <input className='' name="email" id="email" type="email" required></input>
                </div>

                <div className='field'>
                  <label for="number">Phone number</label>
                  <input className='' name="number " id="number" type="number" required></input>

                </div>
              </div>
            </Form>
          </div>


          <div className='section'>
            <p className='container'>Receiver Details</p>
            <hr></hr>
            <Form method='POST' action='http://127.0.0.1:8000/shipment/'>
              <div className='d-flex design2'>

                <div className='field'>
                  <label for="name1"> Receiver Name</label>
                  <input className='' name="name1" id="name1" type="text" required></input>
                </div>



                <div className='field'>
                  <label for="address1"> Receiver address</label>
                  <input className='' name="address1" id="address1" type="text" required></input>

                </div>
              </div>
              <div className='d-flex design2'>

                <div className='field'>

                  <label for="email1">Email</label>
                  <input className='' name="email1" id="email1" type="email" required></input>
                </div>

                <div className='field'>
                  <label for="number1">Phone number</label>
                  <input className='' name="number1 " id="number1" type="number" required></input>
                </div>
              </div>
            </Form>
          </div>


          <div className='section'>
            <p className='container'>Shipment Details</p>
            <hr></hr>
            <Form method='POST' action='http://127.0.0.1:8000/shipment/'>
              <div className='d-flex design2'>

                <div className='field'>
                  <label for="goods">Goods Included in Shipment</label>
                  <input className='' name="goods" id="goods" type="text" required></input>
                </div>



                <div className='field'>
                  <label for="weight"> Total Weight in KG</label>
                  <input className='' name="weight" id="weight" type="text" required></input>
                </div>
              </div>
              <div className='d-flex design2'>
                <div className='field'>
                  <label for="package">Package Dimensions in cm</label>
                  <input className='' name="package" id="package" type="text" required></input>
                </div>
                <div className='field'>
                  <label for="number2">Shipment Cost</label>
                  <input className='' name="number2" id="number2" type="number" required></input>
                </div>
              </div>
              <div className='section'>
                <label htmlFor='terms'>I agree to the ExpressTrack Terms and Conditions</label>
                  <input type="checkbox" name="terms" required></input>
                  
                



              </div>
              <div className='section'>

                 <button type='submit'>Request Pickup</button>
              </div>

            </Form>
          </div>


        
        </div >


      </div >
      <div><Footer/></div>
    </div>
     
  )
}
