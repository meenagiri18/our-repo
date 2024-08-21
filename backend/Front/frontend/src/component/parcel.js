import React, { useState } from 'react'
import { Row, Image, Form, } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Parcelimg1 from '../images/parcelimg1.png';
import './parcel.css'
import styled from 'styled-components'
import Navbar from './navbar';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";


const ErrorMessage = styled.p`
    color: ${props => props.color || 'black'};
    
`;





export default function Parcel() {
    const [parcelID, setParcelID] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [senderName, setSenderName] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('');
    const [message, setMessage] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');
    const [messageType, setMessageType] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!senderName || !receiverName || !currentLocation || !destinationLocation) {
            setMessage("All fields are required.");
            setMessageType('error');
            return;
        }


        let errorMessages = [];

        // Validate senderName
        if (!isNaN(senderName)) {
            errorMessages.push("Sender name must not be a number.");
        }
        // Validate receiverName
        if (!isNaN(receiverName)) {
            errorMessages.push("Receiver name must not be a number.");
        }
        // Validate location
        if (!isNaN(currentLocation)) {
            errorMessages.push("Current location must not be a number.");
        }
        if (!isNaN(destinationLocation)) {
            errorMessages.push("Destination location must not be a number.");
        }
        if (errorMessages.length > 0) {
            setMessage(errorMessages.join(" "));
            setMessageType('error');
            return;
        }

        const parcelData = {
            receiver_name: receiverName,
            sender_name: senderName,
            current_location: currentLocation,
            destination_location: destinationLocation,
        };
        try {
            const response = await fetch('http://127.0.0.1:8000/api/create_parcel/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify(parcelData),

                });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                setTrackingNumber(data.tracking_number);
                setParcelID(data.parcelid);
                setMessageType('success');

            }
            else {
                const errorData = await response.json();
                setMessage(errorData.error || 'Failed to create parcel. Please try again.');
                setMessageType('error');
            }

        }
        catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred.Please try again.');
            setMessageType('error');

        }

    };



    return (
        <div>
            <div><Navbar /></div>

            <div className='section1'>
                <div>
                    <Image src={Parcelimg1} alt='error' width={550}></Image>
                </div>
                <div>
                    <div>
                        {trackingNumber && <div className='message'>Tracking Number: {trackingNumber}</div>}
                        {parcelID && <div className='message'>Parcel ID: {parcelID}</div>}
                    </div>
                    <div className='copy'>

                        <Row className=''>
                            <h2>You can create your parcel here!!</h2>
                        </Row>

                        <Form method='POST' onSubmit={handleSubmit} action='http://127.0.0.1:8000/api/create_parcel/' className='formm' >


                            <Row>
                                <Form.Group>
                                    <Form.Label htmlFor="receivername">Receiver Name</Form.Label>
                                    <Form.Control className='w-100 ' type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} required></Form.Control>
                                </Form.Group>

                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label htmlFor="sendername">Sender Name</Form.Label>
                                    <Form.Control className='w-100 ' type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} required></Form.Control>
                                </Form.Group>

                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label htmlFor="currentlocation">Current location</Form.Label>
                                    <Form.Control className='w-100 ' type="text" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} required></Form.Control>
                                </Form.Group>

                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label htmlFor="destinationlocation">Destination location</Form.Label>
                                    <Form.Control className='w-100 ' type="text" value={destinationLocation} onChange={(e) => setDestinationLocation(e.target.value)} required></Form.Control>
                                </Form.Group>
                            </Row>
                            <button className='w-100 mt-3 log3' type='submit'>Submit</button>
                            {message && messageType === 'error' && <ErrorMessage color='red'>{message}</ErrorMessage>}
                            {message && messageType === 'success' && <div className='message'>{message}</div>}

                        </Form>

                    </div>
                </div>
            </div>

            <div className='footer_d'>
                <div className='footer'>
                    <h8>Home</h8>
                    <h8>About</h8>
                    <h8>Parcel Creation</h8>
                    <h8>Tracking</h8>
                </div>
                <div className='footer2'>
                    <FaFacebookSquare className='iconimg' />
                    <FaInstagramSquare className='iconimg' />
                    <FaSquareXTwitter className='iconimg' />
                    <FaGithubSquare className='iconimg' />
                </div>
                <div className='footer3'>© Copyright 2020, All rights reserved</div>
            </div>
        </div>
    )
}
