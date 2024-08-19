import React, { useState } from 'react';
import './tracking.css'
import Navbar from './navbar';

const TrackingForm = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingDetails, setTrackingDetails] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setTrackingNumber(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setTrackingDetails(null);
        setError('');

        try {
            const response = await fetch('/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tracking_number: trackingNumber }),
            });

            if (response.ok) {
                const data = await response.json();
                setTrackingDetails(data);
            } else {
                setError('Tracking number not found or error fetching data.');
            }
        } catch (err) {
            setError('An error occurred while tracking the package.');
        }
    };


    return (
        <div>
            <div><Navbar /></div>
            <div className='tracking-container'>PRODUCT TRACKING</div>
            <div className="tracking-form-container">
                <h1>TRACK YOUR PRODUCT</h1>

                

                    <form onSubmit={handleSubmit}>
                    <div className='container-box'>
                        <div className='container-box2 w-50'>
                            <input className='p-3 w-100'
                                type="text"
                                id="tracking-number"
                                placeholder='Enter Tracking Code'
                                value={trackingNumber}
                                onChange={handleInputChange}
                                required

                            />
                        </div>

                        <div  className='btnnn w-50'>
                            <button type="submit" className='btn-last w-100'>TRACK YOUR PRODUCT</button>
                        </div>


                        </div>
                    </form>
                


                {error && <p className="error">{error}</p>}

                {trackingDetails && (
                    <div className="tracking-details">
                        <h3>Tracking Information</h3>
                        <p>Status: {trackingDetails.status}</p>
                        <p>Current Location: {trackingDetails.location}</p>
                        <p>Expected Delivery: {trackingDetails.expected_delivery}</p>
                    </div>
                )}
            </div>

        </div>
    );
};
export default TrackingForm;
