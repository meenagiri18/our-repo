import React, { useState } from 'react';
import './tracking.css'
import Navbar from './navbar';
import Footer from './footer'


const TrackingForm = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingDetails, setTrackingDetails] = useState('');
    const [error, setError] = useState('');
    const [shortestPaths, setShortestPaths] = useState("");

    const handleInputChange = (e) => {
        setTrackingNumber(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setTrackingDetails('');
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/track_parcel/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tracking_number: trackingNumber }),
            });

            if (response.ok) {
                const data = await response.json();
                setTrackingDetails(data);
                const locations = [];
                data.routes.forEach(route => {
                    if (!locations.includes(route.from)) locations.push(route.from);
                    if (!locations.includes(route.to)) locations.push(route.to);
                });

                const size = locations.length;
                const graph = Array.from({ length: size }, () => Array(size).fill(Infinity));

                // Initialize the graph with distances
                for (let i = 0; i < size; i++) {
                    graph[i][i] = 0;
                }

                data.routes.forEach(route => {
                    const fromIndex = locations.indexOf(route.from);
                    const toIndex = locations.indexOf(route.to);
                    graph[fromIndex][toIndex] = route.distance;
                });

                // Calculate the shortest paths using Floyd-Warshall
                const paths = floydWarshall(graph);
                setShortestPaths(paths);
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
                <form method='POST' onSubmit={handleSubmit} action='http://127.0.0.1:8000/api/track_parcel/'>
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

                        <div className='btnnn w-50'>
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
                        {trackingDetails.destination && (
                            <p>Destination Location: {trackingDetails.destination}</p>
                        )}


                        <div><MyComponent /></div>


                    </div>
                )}
                {shortestPaths && (
                    <div className="shortest-paths">
                        <h3>Shortest Paths Matrix</h3>
                        <pre>{JSON.stringify(shortestPaths, null, 2)}</pre>
                    </div>
                )}

            </div>
           <div><Footer/></div>
        </div>
    );
};
export default TrackingForm;
