import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditReservation = function (props) {

    const id = props.location.state.id;

    const [inputs, setInputs] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phone: '',
        dateFrom: '',
        dateTo: '',
        numberOfGuest: '',

        roomId: '',
        price: '',
        roomNo: '',
        classification: ''
    });
  
    const [redirect, setRedirect] = useState(false);
  
    useEffect(() => {
      (async () => {
        const bookingsResp = await Axios.get(`/api/bookings/${id}`);
        if (bookingsResp.status === 200) setInputs(bookingsResp.data);
      })();
    }, []);
  
    const handleSubmit = async event => {
      event.preventDefault();
  
      try {
        const resp = await Axios.post('/api/bookings/update', inputs);
  
        if (resp.status === 200)  {
          toast("Reservation added successfully", {
            type: toast.TYPE.SUCCESS
          });
          setRedirect(true);
        } else {
          toast("There was an issue saving the reservation", {
            type: toast.TYPE.ERROR
          });
        }
      } catch (error) {
        toast("There was an issue saving the reservation", {
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
  
    if (redirect) return (<Redirect to="/bookings"/>);

  return (
    <Container className="my-5">

    <header>
            <br/>
            <h1 className="display-3">Reservation</h1>
    </header>


    <div>
        
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Control
             type="hidden"
              name="roomId"
              onChange={handleInputChange}
              value={inputs.id}
            />
          </Form.Group>           
          <Form.Group>
            <Form.Control
             type="hidden"
              name="roomNo"
              onChange={handleInputChange}
              value={inputs.roomNo}
            />
          </Form.Group>
        <Form.Group>
            <Form.Control
             type="hidden"
              name="classification"
              onChange={handleInputChange}
              value={inputs.classification}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="hidden"
              name="price"
              onChange={handleInputChange}
              value={inputs.price}
            />
          </Form.Group>

            <div className="form-row">
                <div className="col-md-6 mb-3">
                <Form.Group>
                    <Form.Label>First name:</Form.Label>
                    <Form.Control 
                    name="firstName"
                    onChange={handleInputChange}
                    value={inputs.firstName}
                    />
                </Form.Group>                 
                </div>

                <div className="col-md-6 mb-3">
                <Form.Group>
                    <Form.Label>Last name:</Form.Label>
                    <Form.Control 
                    name="lastName"
                    onChange={handleInputChange}
                    value={inputs.lastName}
                    />
                </Form.Group>                 
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-6 mb-3">
                <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                    name="address"
                    onChange={handleInputChange}
                    value={inputs.address}
                    />
                </Form.Group>                 
                </div>

                <div className="col-md-3 mb-3">
                <Form.Group>
                    <Form.Label>Contact</Form.Label>
                    <Form.Control 
                    name="phone"
                    onChange={handleInputChange}
                    value={inputs.phone}
                    />
                </Form.Group>                 
                </div>

                <div className="col-md-3 mb-3">
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    name="email"
                    onChange={handleInputChange}
                    value={inputs.email}
                    />
                </Form.Group>                 
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <Form.Group>
                        <Form.Label>From</Form.Label>
                        <Form.Control 
                        type="date"
                        name="dateFrom"
                        onChange={handleInputChange}
                        value={inputs.dateFrom}
                        />
                    </Form.Group>                 
                    </div>
                    <div className="col-md-4 mb-3">
                    <Form.Group>
                        <Form.Label>To</Form.Label>
                        <Form.Control 
                        type="date"
                        name="dateTo"
                        onChange={handleInputChange}
                        value={inputs.dateTo}
                        />
                    </Form.Group>                 
                    </div>
                    <div className="col-md-4 mb-3">
                    <Form.Group>
                        <Form.Label>Number of Guest</Form.Label>
                        <Form.Control 
                        name="numberOfGuest"
                        onChange={handleInputChange}
                        value={inputs.numberOfGuest}
                        />
                    </Form.Group>                 
                    </div>
            </div>

            <Form.Group>
            <button type="submit" className="btn btn-primary">Submit</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default EditReservation;