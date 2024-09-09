import React, {useState} from 'react';
import { Form } from 'react-bootstrap';
import Navbar from './navbar';
import './shipment.css';
import Footer from './footer';

export default function Shipment() {
  const [weight, setWeight] = useState(''); 
  const [cost, setCost] = useState(0); 
  const [errorMessage, setErrorMessage] = useState(''); 

  
  const calculateCost = (weightValue) => {
    const costPerKg = 50; 
    const totalCost = weightValue * costPerKg;
    setCost(totalCost); 
  };

 
  const handleWeightChange = (e) => {
    const weightValue = e.target.value;
    setWeight(weightValue); 

    
    if (weightValue > 25) {
      setErrorMessage('The maximum allowed weight is 25 kg.');
      setCost(0); 
    } else {
      setErrorMessage(''); 
      if (weightValue > 0) {
        calculateCost(weightValue);
      } else { 
        setCost(0); 
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="border border-2 main">
          <div className="section">
            <p className="container">Sender Details</p>
            <hr />
            <Form method="POST" action="http://127.0.0.1:8000/shipment/">
              <div className="design2">
                <div className="field">
                  <label htmlFor="name">Sender Name</label>
                  <input name="sender" id="name" type="text" required />
                </div>

                <div className="field">
                  <label htmlFor="address">Sender Address</label>
                  <input name="address" id="address" type="text" required />
                </div>
              </div>
              <div className="design2">
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input name="email" id="email" type="email" required />
                </div>

                <div className="field">
                  <label htmlFor="number">Phone Number</label>
                  <input name="number" id="number" type="number" required />
                </div>
              </div>

              <div className="section">
                <p className="container">Receiver Details</p>
                <hr />
                <div className="d-flex design2">
                  <div className="field">
                    <label htmlFor="name1">Receiver Name</label>
                    <input name="receiver" id="name1" type="text" required />
                  </div>

                  <div className="field">
                    <label htmlFor="address1">Receiver Address</label>
                    <input name="address1" id="address1" type="text" required />
                  </div>
                </div>
                <div className="d-flex design2">
                  <div className="field">
                    <label htmlFor="email1">Receiver Email</label>
                    <input name="email1" id="email1" type="email" required />
                  </div>

                  <div className="field">
                    <label htmlFor="number1">Receiver Phone Number</label>
                    <input name="number1" id="number1" type="number" required />
                  </div>
                </div>
              </div>

              <div className="section">
                <p className="container">Shipment Details</p>
                <hr />
                <div className="d-flex design2">
                  <div className="field">
                    <label htmlFor="goods">Goods Included in Shipment</label>
                    <input name="goods" id="goods" type="text" required />
                  </div>

                  <div className="field">
                    <label htmlFor="weight">Total Weight in KG</label>
                    <input
                      name="weight"
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={handleWeightChange}
                      required
                    />
                  </div>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div className="d-flex design2">
                  <div className="field">
                    <label htmlFor="package">Package Dimensions in cm</label>
                    <input name="package" id="package" type="text" required />
                  </div>

                  <div className="field">
                    <label htmlFor="number2">Shipment Cost</label>
                    <input
                      name="number2"
                      id="number2"
                      type="number"
                      value={cost} 
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="section">
                <label htmlFor="terms">
                  I agree to the ExpressTrack Terms and Conditions
                </label>
                <input type="checkbox" name="terms" required />
              </div>

              <div className="section">
                <button type="submit">Request Pickup</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


