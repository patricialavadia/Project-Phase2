import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function Reservation () {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => {
      await getBookings();
    })();
  }, []);

  const getBookings = async () => {
    const bookingsResp = await Axios.get('/api/bookings');
    if (bookingsResp.status === 200) setBookings(bookingsResp.data)
  };
  const deleteBookings = async bookings => {
    try {
      const resp = await Axios.post('/api/bookings/delete', {
        id: bookings._id
      });

      if (resp.status === 200) toast("The Reservation was deleted successfully", {type: toast.TYPE.SUCCESS});

      await getBookings();
    } catch (error) {
      toast("There was an error deleting the reservation", {type: toast.TYPE.ERROR});
    }
  };
  return (
    <Container className="my-5">
      <header>
        <h1 className="h1">Reservation</h1>
      </header>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Room</th>
            <th scope="col">Check-in</th>
            <th scope="col">Check-out</th>
            <th scope="col">Customer</th>
            <th scope="col">Guest</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
            {bookings && bookings.map((booking, i) => (
          <tr key={i}>
            <td>{ booking.roomNo }</td>
            <td>{ booking.dateFrom }</td>
            <td>{ booking.dateTo }</td>
            <td>{ booking.firstName} { booking.lastName }</td>
            <td>{ booking.numberOfGuest }</td>  
            <td>
            <Link className="btn btn-primary mr-1"  to={{
                        pathname: "/bookings/show",
                        state: {
                          id: booking._id
                        }
                      }}>
                        Show
                      </Link>

                      <Link className="btn btn-primary mr-1" to={{
                        pathname: "/bookings/edit",
                        state: {
                          id: booking._id
                        }
                      }}>
                        Update
                      </Link>

                      <button className="btn btn-primary mr-1" type="button" onClick={() => deleteBookings(booking)}>
                        Delete
                      </button>     
            </td>
            </tr>

            ))}
        </tbody>
        </table>
    </Container>

  );
};

export default Reservation;