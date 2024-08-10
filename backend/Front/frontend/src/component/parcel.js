import React, { useState } from 'react'
import { Row, Image, Col, Container, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Delivery from '../images/delivery.png';
import './parcel.css'


export default function Parcel() {
    const [parcelid, setParcelID] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [senderName, setSenderName] = useState('');
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');
    const [trackingNumber, setTrackingNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const parcelData ={
            parcel_id:parcelid,
            receiver_name:receiverName,
            sender_name:senderName,
            location:location,
        };
        try{
            const response = await fetch({
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
            }
            else{
                setMessage('Failed to create parcel.Please try again.');

            }

        }
        catch(error){
            console.error('Error:',error);
            setMessage('An error occurred.Please try again.');
        }
        
    };



    return (
        <Container fluid className='section'>
            <div className='section1'>
                <Col>
                    <Image src={Delivery} alt='error' width={750}></Image>
                </Col>

                <div className='copy'>
                    <Row className=''>
                        <h1>You can create your parcel here!!</h1>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group>
                                <Form.Label htmlFor="parcelid">Parcel ID</Form.Label>
                                <Form.Control className='w-100 m-2'  type="text" value={parcelid} onChange={(e) => setParcelID(e.target.value)} required></Form.Control>
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label for="receivername">Receiver Name</Form.Label>
                                <Form.Control className='w-100 m-2'  type="text" value={receiverName} onChange={(e) => setReceiverName(e.target.value)}required></Form.Control>
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label for="sendername">Sender Name</Form.Label>
                                <Form.Control className='w-100 m-2'  type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} required></Form.Control>
                            </Form.Group>

                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label for="location">Location</Form.Label>
                                <Form.Control className='w-100 m-2'  type="text" value={location} onChange={(e) => setLocation(e.target.value)} required></Form.Control>
                            </Form.Group>

                        </Row>
                        <button className='w-100 m-2'>Submit</button>
                    </Form>
                    {message && <p>{message}</p>}
                    {trackingNumber && <p>Tracking Number:{trackingNumber}</p>}
                </div>
            </div>
        </Container>
    )
}
