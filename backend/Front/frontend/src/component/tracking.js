import React, { useState, useEffect } from 'react';
import './tracking.css'
import Navbar from './navbar';
import Footer from './footer'
import axios from 'axios'

const TrackingParcel = () => {
    const [trackingNumber, settrackingNumber] = useState('');
    const [result, setResult] = useState([]);



    const handleClick = (e) => {
        e.preventDefault();
        axios.get("http://127.0.0.1:8000/api/track_api/").then((response) => {
            const item = response.data;
            const data = item.filter((list) => {
                return (
                    list.tracking_number.includes(trackingNumber)

                );
            });
            setResult(data);


        })
        .catch((error) => {
            console.error("There was an error fetching the tracking data!", error);
        });


    }


    useEffect(() => {


        return () => {

        }
    }, [])



    return (
        <div>
            <div><Navbar /></div>
            <div className='tracking-container'>PRODUCT TRACKING</div>

            <div className="tracking-form-container">
                <h1>TRACK YOUR PRODUCT</h1>
                <form >
                    <div className='container-box'>
                        <div className='container-box2 w-50'>
                            <input className='p-3 w-100'
                                type="text"
                                id="tracking-number"
                                placeholder='Enter Tracking Code'
                                value={trackingNumber}
                                onChange={(e) => {
                                    settrackingNumber(e.target.value)
                                }}
                                required

                            />
                        </div>

                        <div className='btnnn w-50'>
                            <button onClick={handleClick} className='btn-last w-100'>TRACK YOUR PRODUCT</button>
                        </div>


                    </div>
                </form>





                <div>
                    <h3>Track Order Status</h3>
                    <p>Track Order</p>
                    {result && (
                        <div>
                            {result.status}
                        </div>
                    )}
                </div>

            </div>
            <div><Footer /></div>

        </div>
    );
};
export default TrackingParcel;