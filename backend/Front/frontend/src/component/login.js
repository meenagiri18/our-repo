import React, { useState } from 'react'
import { Form, Row, Col, Image, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import Login1 from '../images/login1.png'
import './login.css'

export default function Login() {
  const [errorMessage,setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const response = await fetch("http://127.0.0.1:8000/login/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = data.redirect; // Redirect on successful login
    } else {
      setErrorMessage(data.error); // Set error message
    }
  };


  
  return (
    <Container fluid className='form'>
      <Row className=' form2 container'>
        <Col className=' left'>
          <Image src={Login1} alt="error" width={500}></Image>
        </Col>

        <div className='right container'>
          <Row>
            <h2>You are welcome here!</h2>
            <p>Login To Your Account!</p>
          </Row>
          <hr></hr> 
          <Form  className='btl' method='POST' onSubmit={handleSubmit}>
            <Row>
              <Form.Group>
                <Form.Label for="email">Email</Form.Label>
                <Form.Control className='' name="email" id="email" type="email" required></Form.Control>
              </Form.Group>

            </Row>
            <Row className='mt-3'>
              <Form.Group >
                <Form.Label for="password">Password</Form.Label>
                <Form.Control className='' name="password" id="password" type="password" required></Form.Control>
              </Form.Group>

            </Row>
            
            {errorMessage && (
            <Row>
              <Col>
                <div className="alert alert-danger">{errorMessage}</div>
              </Col>
            </Row>
            )}

            <Row>
              <Col>
                <button type="submit" className=" log2 w-100">LOGIN</button>
              </Col>
            </Row>

            <Row className='sub-2 mt-3'>
              <Form.Text>Need an account? <Link to="/signup">Create an account</Link>
              </Form.Text>
            </Row>
          </Form>
        </div>
      </Row>
    </Container>
  )
}
