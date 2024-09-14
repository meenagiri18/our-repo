import React, { useState } from 'react';
import Navbar from './navbar';
import './shipment.css';
import Footer from './footer';

export default function Shipment() {
  const [weight, setWeight] = useState('');
  const [cost, setCost] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [dimension, setDimension] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [goods, setGoods] = useState(''); // Added state for goods included in shipment

  // Function to handle form submission
  function handleClick(event) {
    event.preventDefault();

    // Nepali phone number and email validation patterns
    const phonePattern = /^(97|98)\d{8}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const goodsPattern = /^[^\d]*$/; // Pattern to check if goods field contains no numbers

    // Validation for sender and receiver
    if (
      dimension === '' || 
      email === '' || 
      phone === '' || 
      receiverEmail === '' || 
      receiverPhone === '' ||
      goods === ''
    ) {
      alert('All fields are required.');
    } else if (!goodsPattern.test(goods)) {
      alert('Goods field should not contain numbers.');
    } else if (!phonePattern.test(phone)) {
      alert('Please enter a valid 10 digit Nepali Phone Number for the Sender.');
    } else if (!emailPattern.test(email)) {
      alert('Please enter a valid email address for the Sender.');
    } else if (!phonePattern.test(receiverPhone)) {
      alert('Please enter a valid 10 digit Nepali Phone Number for the Receiver.');
    } else if (!emailPattern.test(receiverEmail)) {
      alert('Please enter a valid email address for the Receiver.');
    } else if (dimension <= 0) {
      alert('Dimension must be a positive number greater than zero.');
    } else {
      alert('Successfully submitted');
      event.target.form.submit();
    }
  }

  // Function to calculate shipment cost
  const calculateCost = (weightValue) => {
    const costPerKg = 50;
    const totalCost = weightValue * costPerKg;
    setCost(totalCost);
  };

  // Function to handle weight input change
  const handleWeightChange = (e) => {
    const weightValue = e.target.value;
    setWeight(weightValue);

    if (weightValue > 25) {
      setErrorMessage('The maximum allowed weight is 25 kg.');
      setCost(0);
    } else if (weightValue < 0) {
      setErrorMessage('Weight cannot be negative.');
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
          <form method="POST" action="http://127.0.0.1:8000/shipment/" className="w-100 container">
            <p className="container">Sender Details</p>
            <hr />
            <div className="section">
              <div className="design2">
                <div className="field">
                  <label htmlFor="name">Sender Name*</label>
                  <input name="sender" id="name" type="text" required />
                </div>

                <div className="field">
                  <label htmlFor="address">Sender Address*</label>
                  <input name="address" id="address" type="text" required />
                </div>
              </div>
              <div className="design2">
                <div className="field">
                  <label htmlFor="email">Email*</label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update sender email state
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="number">Phone Number*</label>
                  <input
                    name="number"
                    id="number"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} // Update sender phone state
                    required
                  />
                </div>
              </div>
            </div>

            <p className="container">Receiver Details</p>
            <hr />
            <div className="section">
              <div className="d-flex design2">
                <div className="field">
                  <label htmlFor="name1">Receiver Name*</label>
                  <input name="receiver" id="name1" type="text" required />
                </div>

                <div className="field">
                  <label htmlFor="address1">Receiver Address*</label>
                  <input name="address1" id="address1" type="text" required />
                </div>
              </div>
              <div className="d-flex design2">
                <div className="field">
                  <label htmlFor="email1">Receiver Email*</label>
                  <input
                    name="email1"
                    id="email1"
                    type="email"
                    value={receiverEmail}
                    onChange={(e) => setReceiverEmail(e.target.value)} // Update receiver email state
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="number1">Receiver Phone Number*</label>
                  <input
                    name="number1"
                    id="number1"
                    type="number"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)} // Update receiver phone state
                    required
                  />
                </div>
              </div>
            </div>

            <p className="container">Shipment Details</p>
            <hr />
            <div className="section">
              <div className="d-flex design2">
                <div className="field">
                  <label htmlFor="goods">Goods Included in Shipment*</label>
                  <input
                    name="goods"
                    id="goods"
                    type="text"
                    value={goods}
                    onChange={(e) => setGoods(e.target.value)} // Update goods state
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="weight">Total Weight in KG*</label>
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
                  <label htmlFor="package">Package Dimensions in cm*</label>
                  <input
                    name="package"
                    id="package"
                    type="number"
                    value={dimension}
                    onChange={(e) => setDimension(e.target.value)} // Update package dimensions state
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="number2">Shipment Cost*</label>
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

            <div className="section6 container">
              <input type="checkbox" name="terms" required />
              <div htmlFor="terms">I agree to the ExpressTrack Terms and Conditions</div>
            </div>

            <div className="section">
              <button type="submit" onClick={handleClick}>
                Request Pickup
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
