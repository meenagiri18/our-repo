import React, { useState } from 'react'
import { Row, Image, Col, Container, Form,} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Delivery from '../images/delivery.png';
import './parcel.css'
import styled from 'styled-components'

const ErrorMessage = styled.p`
    color: ${props => props.color || 'black'};
    margin: 10px 0;
`;

const SuccessMessage = styled.p`
    color: green;
    margin: 10px 0;
`;



export default function Parcel() {
    const [parcelID, setParcelID] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [senderName, setSenderName] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');
    const[messageType,setMessageType]=useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();

         // Client-side validation
    if (!senderName || !receiverName || !location) {
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
    if (!isNaN(location)) {
        errorMessages.push("Location must not be a number.");
    }
    if (errorMessages.length > 0) {
        setMessage(errorMessages.join(" "));
        setMessageType('error');
        return;
    }

        const parcelData ={
            receiver_name:receiverName,
            sender_name:senderName,
            location:location,
        };
        try{
            const response = await fetch('http://127.0.0.1:8000/api/create_parcel/', 
                {
                method:'POST',
                headers:{
                    'Content-Type':"application/json",
                },
                body:JSON.stringify(parcelData),

            });

            if(response.ok){
                const data = await response.json();
                setMessage(data.message);
                setTrackingNumber(data.tracking_number);
                setParcelID(data.parcelid);
                setMessageType('success');

            }
            else{
                const errorData = await response.json();
                setMessage(errorData.error || 'Failed to create parcel. Please try again.');
                setMessageType('error');
            }

        }
        catch(error){
            console.error('Error:',error);
            setMessage('An error occurred.Please try again.');
            setMessageType('error');

        }
        
    };



    return (
        <Container fluid className='section'>
            <div className='section1'>
                <Col>
                    <Image src={Delivery} alt='error' width={550}></Image>
                </Col>

                <div className='copy'>
                    <Row className=''>
                        <h1>You can create your parcel here!!</h1>
                    </Row>
                    <Form method='POST' onSubmit={handleSubmit} action='http://127.0.0.1:8000/api/create_parcel/' >
                        
                        
                        <Row>
                            <Form.Group>
                                <Form.Label htmlFor="receivername">Receiver Name</Form.Label>
                                <Form.Control className='w-100 '  type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)}required></Form.Control>
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label htmlFor="sendername">Sender Name</Form.Label>
                                <Form.Control className='w-100 '  type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} required></Form.Control>
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label htmlFor="location">Location</Form.Label>
                                <Form.Control className='w-100 '  type="text" value={location} onChange={(e) => setLocation(e.target.value)} required></Form.Control>
                            </Form.Group>

                        </Row>
                        <button className='w-100 m-2' type='submit'>Submit</button>
                    </Form>
                    {message && messageType === 'error'&& <ErrorMessage color='red'>{message}</ErrorMessage>}
                    {message && messageType === 'success'&& <SuccessMessage>{message}</SuccessMessage>}
                    {trackingNumber && <SuccessMessage>Tracking Number: {trackingNumber}</SuccessMessage>}
                    {parcelID && <SuccessMessage>Parcel ID: {parcelID}</SuccessMessage>}
                </div>
            </div>
        </Container>
    )
}
