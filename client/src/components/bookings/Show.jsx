import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Show = function (props) {

    const id = props.location.state.id;

    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: '',
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
        const roomResp = await Axios.get(`/api/bookings/${id}`);
        if (roomResp.status === 200) setInputs(roomResp.data);
      })();
    }, []);
  
    const handleSubmit = async event => {
      event.preventDefault();
  
      try {
        const resp = await Axios.get('/api/bookings/show', inputs);
  
        if (resp.status === 200)  {
          toast("The data was fetch successfully", {
            type: toast.TYPE.SUCCESS
          });
          setRedirect(true);
        } else {
          toast("There was an issue viewing the reservation", {
            type: toast.TYPE.ERROR
          });
        }
      } catch (error) {
        toast("There was an issue viewing the reservation", {
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
        <br/>
      <div className="card-header">
            Reservation Details
        </div>
        <div className="card-body">
            <div className="form-group">
                <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Room</th>
                        <th scope="col">Room-Type</th>
                        <th scope="col">Check-in</th>
                        <th scope="col">Check-out</th>
                        <th scope="col">Guest</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                        <td>{ inputs.roomNo }</td>
                        <td>{ inputs.classification }</td>
                        <td>{ inputs.dateFrom }</td>
                        <td>{ inputs.dateTo }</td>
                        <td>{ inputs.numberOfGuest }</td>
                        <td>$ { inputs.price }</td>
                    </tbody>
                </table>
            </div> 
        </div>
        <div className="card-header">
            Customer Information
        </div>
        <div className="card-body">
            <div className="form-group">
                <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                        <td>{ inputs.firstName }</td>
                        <td>{ inputs.lastName }</td>
                        <td>{ inputs.address }</td>
                        <td>{ inputs.phone }</td>
                        <td>{ inputs.email }</td>
                    </tbody>
                </table>
            </div> 
            <Link className="btn btn-secondary"  to={{
                        pathname: "/bookings",
                        state: {
                          id: inputs._id
                        }
                      }}>
                       <i class="fa fa-h-square" aria-hidden="true"></i> Reservations
            </Link>
        </div>
        <div className="card-footer text-muted">
            { inputs.createdAt }
        </div>
    </Container>
  );

};

export default Show;