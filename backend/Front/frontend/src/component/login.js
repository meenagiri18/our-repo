import React from 'react'
import { Form, Row, Col, Image, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import Login1 from '../images/login1.png'
import './login.css'

export default function Login() {
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
          <Form method='POST' action='http://127.0.0.1:8000/login/'>
            <Row>
              <Form.Group>
                <Form.Label for="email">Email</Form.Label>
                <Form.Control className='w-100' name="email" id="email" type="email" required></Form.Control>
              </Form.Group>

            </Row>
            <Row>
              <Form.Group className='mt-3'>
                <Form.Label for="password">Password</Form.Label>
                <Form.Control className='w-100' name="password" id="password" type="password" required></Form.Control>
              </Form.Group>

            </Row>

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
