import React, { useState } from 'react'
import { Row, Form, Image,Container, Col,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import Login1 from '../images/login1.png'


export default function Signup() {
  const [errorMessage,setErrorMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const response = await fetch("http://127.0.0.1:8000/signup/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = data.redirect; // Redirect on successful login
    } else {
      setErrorMessage(data.error || data.error1 || data.error2 || data.error3); // Set error message
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
          </Row>


          <Form className='btl' method="POST" onSubmit={handleSubmit}>
            <Row>
              <Form.Group>
                <Form.Label for="email">Email</Form.Label>
                <Form.Control className='w-100' name="email" id="email" type="email" required></Form.Control>
              </Form.Group>
            </Row>

            <Row className='mt-3'>
              <Form.Group>
                <Form.Label for="password">Password</Form.Label>
                <Form.Control className='w-100' name="Password" id="Password" type="Password" required></Form.Control>
              </Form.Group>
            </Row>
            <Row className='mt-3'>
              <Form.Group>
                <Form.Label for="password">Confirm Password</Form.Label>
                <Form.Control className='w-100' name="password2" id="password2" type="password" required></Form.Control>
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
                <Button type="submit" className=" log2 w-100">SIGNUP</Button>
              </Col>
            </Row>
            <Row className='sub-2 mt-3'>
              <Form.Text>Already have account.<Link to="/login">LOGIN</Link>
              </Form.Text>
            </Row>

          </Form>
        </div>
      </Row>
    </Container>

  )
}
