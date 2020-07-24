import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Show = function (props) {

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
        const resp = await Axios.get('/api/rooms/show', inputs);
  
        if (resp.status === 200)  {
          toast("Thewas fetch successfully", {
            type: toast.TYPE.SUCCESS
          });
          setRedirect(true);
        } else {
          toast("There was an issue viewing the room", {
            type: toast.TYPE.ERROR
          });
        }
      } catch (error) {
        toast("There was an issue viewing the room", {
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
      <br/>
      <div className="card text-center">
        <div className="card-header">
             {inputs.classification}
        </div>
        <div className="card-body">
            <p className="float-right">
                Room {inputs.roomNo}<br/>
                Price $ {inputs.price}
             </p>
          <h5 class="card-title display-4">{inputs.classification}</h5>
          <br/><hr/>
          <p className="card-text">{inputs.description}</p>
        
            <Link className="btn btn-secondary mr-1" to={{
                        pathname: "/rooms"
                      }}>
                      <i className="fa fa-h-square" aria-hidden="true"></i> Home
            </Link>
            <Link className="btn btn-primary mr-1" to={{
                        pathname: "/rooms/{inputs.id }/bookRooms",
                        state: {
                          id: inputs._id
                        }
                      }}>
                      <i className="fa fa-bed" aria-hidden="true"></i> Book
            </Link>      
        
        </div>
        <div className="card-footer text-muted">
            {inputs.createdAt}
        </div>
      </div>
    </Container>
  );

};

export default Show;