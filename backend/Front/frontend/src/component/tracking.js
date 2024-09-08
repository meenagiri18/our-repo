import React, { useState } from 'react';
import axios from 'axios';
import './tracking.css';
import Navbar from './navbar';
import Footer from './footer';

const TrackParcel = () => {
  const [trackingNumber, setTrackingNumber] = useState(''); // Local state for tracking number input
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState(null);

  const fetchTrackingInfo = async (number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/shipments/${number}/`);
      setTrackingInfo(response.data);
      setError(null); // Reset error in case of a successful request
    } catch (err) {
      setError(err);
      setTrackingInfo(null); // Reset tracking info in case of an error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingNumber) {
      fetchTrackingInfo(trackingNumber); // Fetch data based on the tracking number
    }
  };

  return (
    <div>
      <Navbar />

      <div className='tracking-container'>PRODUCT TRACKING</div>

      <div className="tracking-form-container">
        <h1>TRACK YOUR PRODUCT</h1>
        <form onSubmit={handleSubmit}> {/* Form submission handler */}
          <div className='container-box'>
            <div className='container-box2 w-50'>
              <input
                className='p-3 w-100'
                type="text"
                id="tracking-number"
                placeholder='Enter Tracking Code'
                value={trackingNumber} // Controlled input
                onChange={(e) => setTrackingNumber(e.target.value)} // Update local state on change
                required
              />
            </div>

            <div className='btnnn w-50'>
              <button type="submit" className='btn-last w-100'>
                TRACK YOUR PRODUCT
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Display error or loading state */}
      {error ? <div>Error: {error.message}</div> : !trackingInfo && <div>Loading...</div>}

      {/* Display tracking information if available */}
      {trackingInfo && (
        <div>
          <h1>Tracking Information</h1>
          <p>Tracking Number: {trackingInfo.shipment.tracking_number}</p>
          <p>Goods: {trackingInfo.shipment.goods}</p>
          <p>Weight: {trackingInfo.shipment.weight}</p>
          <p>Package Dimensions: {trackingInfo.shipment.package}</p>
          <p>Shipping Cost: {trackingInfo.shipment.shipping_cost}</p>
          <p>Sender: {trackingInfo.shipment.sender_name}, {trackingInfo.shipment.sender_address}</p>
          <p>Receiver: {trackingInfo.shipment.receiver_name}, {trackingInfo.shipment.receiver_address}</p>
          <p>Status: {trackingInfo.shipment.status}</p>
          <p>Current Location: {trackingInfo.shipment.current_location}</p>
          <p>Delivery Date: {trackingInfo.shipment.delivery_date}</p>
          <p>Shortest Distance: {trackingInfo.shortest_distance}</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TrackParcel;
