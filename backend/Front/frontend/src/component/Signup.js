import React from 'react'
import { Row, Form, Image,Container, Col,Button} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import Login1 from '../images/login1.png'


export default function Signup() {
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


          <Form method="POST" action="">
            <Row>
              <Form.Group>
                <Form.Label for="email">Email</Form.Label>
                <Form.Control className='w-100' name="email" id="email" type="email" required></Form.Control>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group>
                <Form.Label for="password">Password</Form.Label>
                <Form.Control className='w-100' name="Password" id="Password" type="Password" required></Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
                <Form.Label for="password">Confirm Password</Form.Label>
                <Form.Control className='w-100' name="password2" id="password2" type="password" required></Form.Control>
              </Form.Group>
            </Row>

            <Row>
              <Col>
                <Button type="submit" className=" log2 w-100">SIGNUP</Button>
              </Col>
            </Row>
            <Row className='sub-2 mt-3'>
              <Form.Text>Need an account? <Link to="/Signup">Create an account</Link>
              </Form.Text>
            </Row>

          </Form>
        </div>
      </Row>
    </Container>

  )
}
