import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

    const id = props.location.state.id;

    const [inputs, setInputs] = useState({
        roomNo: '',
        description: '',
        price: '',
        classification: 'DELUXED'
    });
  
    const [redirect, setRedirect] = useState(false);
  
    useEffect(() => {
      (async () => {
        const roomResp = await Axios.get(`/api/rooms/${id}`);
        if (roomResp.status === 200) setInputs(roomResp.data);
      })();
    }, []);
  
    const handleSubmit = async event => {
      event.preventDefault();
  
      try {
        const resp = await Axios.post('/api/rooms/update', inputs);
  
        if (resp.status === 200)  {
          toast("The room was updated successfully", {
            type: toast.TYPE.SUCCESS
          });
          setRedirect(true);
        } else {
          toast("There was an issue updating the room", {
            type: toast.TYPE.ERROR
          });
        }
      } catch (error) {
        toast("There was an issue updating the room", {
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
  
    if (redirect) return (<Redirect to="/rooms"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Edit Rooms</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Room No:</Form.Label>
            <Form.Control
              name="roomNo"
              onChange={handleInputChange}
              value={inputs.roomNo}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Details:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              onChange={handleInputChange}
              value={inputs.description}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Class:</Form.Label>
            <Form.Control
              as="select"
              name="classification"
              onChange={handleInputChange}
              defaultValue={inputs.classification || 'DELUXED'}
            >
              <option value="DELUXED">Deluxed</option>
              <option value="SUITE">Suite</option>
              <option value="PRESIDENTIAL">Presidential</option>
            </Form.Control>
          </Form.Group>

        <Form.Group>
            <Form.Label>Price:</Form.Label>
            <Form.Control
              name="price"
              onChange={handleInputChange}
              value={inputs.price}
            />
          </Form.Group>
          
          <Form.Group>
            <button type="submit" className="btn btn-primary">Submit</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default Edit;