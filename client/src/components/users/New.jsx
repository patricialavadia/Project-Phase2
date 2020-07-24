import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = function () {

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    emailConfirmation: '',
    password: '',
    passwordConfirmation: ''

  });

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/users', inputs);

      if (resp.status === 200)  {
        toast("Account was created successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue registering a new account", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue registering a new account", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Register New User</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              name="firstName"
              onChange={handleInputChange}
              value={inputs.firstName}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              name="lastName"
              onChange={handleInputChange}
              value={inputs.lastName}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              onChange={handleInputChange}
              value={inputs.email}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email confirmation</Form.Label>
            <Form.Control
              name="emailConfirmation"
              onChange={handleInputChange}
              value={inputs.emailConfirmation}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="passwordConfirmation"
              onChange={handleInputChange}
              value={inputs.passwordConfirmation}
            />
          </Form.Group>
          
          <Form.Group>
            <button type="submit" className="btn btn-primary">Register</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default Register;