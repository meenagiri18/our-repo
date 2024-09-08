
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrackParcel = ({ trackingNumber }) => {
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingInfo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/shipments/${trackingNumber}/`);
        setTrackingInfo(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchTrackingInfo();
  }, [trackingNumber]);

  if (error) return <div>Error: {error.message}</div>;
  if (!trackingInfo) return <div>Loading...</div>;

  return (
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
  );
};

export default TrackParcel;
