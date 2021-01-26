import Axios from 'axios';
import React from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { rooturl } from '../../../config/config';

function NewApplication(props) {
  let [submitMsg, setSubmitMsg] = React.useState('');
  let handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    // set the with credentials to true
    // make a post request with the user data
    const formData = {
      "application_details": {
          "home_listing": parseInt(props.match.params.id),
          "offered_price": form.offered_price ? parseInt(form.offered_price.value) : 0,
      },
      "user_details":{
          "sex": form.sex.value,
          "date_of_birth": form.date_of_birth.value,
          "credit_score": parseInt(form.credit_score.value),
          "employment_type": form.employment_type.value,
          "annual_salary": parseInt(form.annual_salary.value),
      }
  };
    Axios.defaults.headers.common["authorization"] = localStorage.getItem("token");
    Axios.post(`${rooturl}/applications/submit`, formData,{ validateStatus: false })
    .then((response) => {
      if (response.status === 201) {
        form.reset();
        setSubmitMsg(<Alert variant="success">Submitted successfully!</Alert>);
      }else{
        let errors = Object.values(response.data || {'error' : ['Something went wrong']});
        setSubmitMsg(errors.map(error => {
          return <Alert variant="danger">{error}</Alert>
        }));
      }
    });
  }

  return (
    <Container>
      <h2>Submit a New Application</h2>
      <br />
      <Container>
        <Form onSubmit={e => handleSubmit(e)}>
          {submitMsg}
          {props.match.params.type === 'sale' && <Row>
            <Col sm='2'>
              <Form.Label>Offer Price</Form.Label>
            </Col>
            <Col>
              <Form.Control type='number' required name='offered_price'></Form.Control>
            </Col>
          </Row>}
          <Row>
            <Col sm='2'>
              <Form.Label>Sex</Form.Label>
            </Col>
            <Col>
            <Form.Group>
              <Form.Check style={{"float":"left"}} inline type="radio" name="sex" value="M" aria-label="radio 1" label="Male" />
              <Form.Check style={{"float":"left"}} type="radio" inline name="sex" value="F" aria-label="radio 1" label="Female" />
            </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm='2'>
              <Form.Label>Date of Birth</Form.Label>
            </Col>
            <Col>
              <Form.Control type='date' required name='date_of_birth'></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col sm='2'>
              <Form.Label>Credit Score</Form.Label>
            </Col>
            <Col>
              <Form.Control type='number' required name='credit_score'></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col sm='2'>
              <Form.Label>Employment Type</Form.Label>
            </Col>
            <Col>
              <Form.Control type='text' required name='employment_type'></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col sm='2'>
              <Form.Label>Annual Salary</Form.Label>
            </Col>
            <Col>
              <Form.Control type='number' required name='annual_salary'></Form.Control>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col sm='2'>
            </Col>
            <Col>
              <Button type='submit'>Submit</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
}

export default NewApplication;