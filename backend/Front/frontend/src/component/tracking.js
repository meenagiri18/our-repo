import React, { useState, useEffect } from 'react';
import './tracking.css';
import Navbar from './navbar';
import Footer from './footer';
import { TiTick } from "react-icons/ti";
import axios from "axios";

const TrackingParcel = () => {
    const status = ["Created", "Pending", "Shipped", "Transit", "Delivered"];
    const [currentStep, setCurrentStep] = useState(1);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [complete, setComplete] = useState(false);
    const [data, setData] = useState(null); // default to null
    const [showTrackingDetails, setShowTrackingDetails] = useState(false); // State to control visibility

    const handleClick = () => {
        axios.get(`http://127.0.0.1:8000/api/trackingN_api/${trackingNumber}/`)
            .then((res) => {
                const item = res.data;
                setData(item.status); // assuming status comes from the API response
                setShowTrackingDetails(true); // Show tracking details after fetching the status
            })
            .catch((error) => {
                console.error("Error fetching tracking data:", error);
            });
    }

    useEffect(() => {
        if (data) {
            switch (data) {
                case "CREATED":
                    setCurrentStep(1);
                    break;
                case "PENDING":
                    setCurrentStep(2);
                    break;
                case "SHIPPED":
                    setCurrentStep(3);
                    break;
                case "IN TRANSIT":
                    setCurrentStep(4);
                    break;
                case "DELIVERED":
                    setCurrentStep(5);
                    setComplete(true); // mark as complete when delivered
                    break;
                default:
                    setCurrentStep(1); // default to the first step if status is unrecognized
            }
        }
    }, [data]);

    return (
        <div>
            <div><Navbar /></div>
            <div className='tracking-container'>PRODUCT TRACKING</div>

            <div className="tracking-form-container">
                <h1>TRACK YOUR PRODUCT</h1>
                <form>
                    <div className='container-box'>
                        <div className='container-box2 w-50'>
                            <input
                                className='p-3 w-100'
                                type="text"
                                id="tracking-number"
                                placeholder='Enter Tracking Code'
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className='btnnn w-50'>
                            <button type='button' onClick={handleClick} className='btn-last w-100'>TRACK YOUR PRODUCT</button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Tracking details are hidden until the user clicks the button */}
            {showTrackingDetails && (
                <div>
                    <h3>Track Order Status</h3>
                    <div className="main-section">
                        {data ? (
                            <>
                                <div className="header">
                                    {status.map((step, i) => (
                                        <div
                                            key={i}
                                            className={`main-header 
                                                ${currentStep === i + 1 ? "active" : ""}
                                                ${(i + 1 < currentStep || complete) ? "complete" : ""}`}
                                        >
                                            <div className="steps">
                                                {i + 1 < currentStep || complete ? <TiTick /> : i + 1}
                                            </div>
                                            <div className="status">{step}</div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div>No tracking data found or error.</div>
                        )}
                    </div>
                </div>
            )}

            <div><Footer /></div>
        </div>
    );
};

export default TrackingParcel;
