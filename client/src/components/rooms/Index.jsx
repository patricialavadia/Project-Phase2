import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function Rooms () {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    (async () => {
      await getRooms();
    })();
  }, []);

  const getRooms = async () => {
    const roomsResp = await Axios.get('/api/rooms');
    if (roomsResp.status === 200) setRooms(roomsResp.data)
  };
  const deleteRooms = async room => {
    try {
      const resp = await Axios.post('/api/rooms/delete', {
        id: room._id
      });

      if (resp.status === 200) toast("The room was deleted successfully", {type: toast.TYPE.SUCCESS});

      await getRooms();
    } catch (error) {
      toast("There was an error deleting the room", {type: toast.TYPE.ERROR});
    }
  };
  return (
    <Container className="my-5">
      <header>
        <h1 className="h1">Our Rooms</h1>
      </header>
    <div class="row">
        {rooms && rooms.map((room, i) => (
          <div key={i}  className="card ml-3 colWidth" >
              <div className="card-body bg-light">
                <h5 className="card-title">
                  {room.roomNo}
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  {room.classification}
                </h6>
                <small className="float-right">$  {room.price} / day</small>
                <br/> <hr/>   
                <div className="d-flex justify-content-center">
                      <Link className="btn btn-success" to={{
                          pathname: "/rooms/bookRooms",
                          state: {
                            id: room._id
                          }
                        }}>
                          <i className="fa fa-bed" aria-hidden="true"></i> Book Now
                        </Link>    
                </div>

                    <hr/>  
                    <div className="float-left">
                      <Link className="btn btn-danger mr-1"  to={{
                        pathname: "/rooms/show",
                        state: {
                          id: room._id
                        }
                      }}>
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </Link>

                      <Link className="btn btn-primary mr-1" to={{
                        pathname: "/rooms/edit",
                        state: {
                          id: room._id
                        }
                      }}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                      </Link>

                      <button className="btn btn-primary mr-1" type="button" onClick={() => deleteRooms(room)}>
                      <i className="fa fa-trash"></i>
                      </button>       
                    </div>
              </div>

              <small className="text-muted">
                    
            </small>

              <div className="card-footer">
                {room.user ? (
                    <small>~{room.user.fullname}</small>
                  ) : null}
              </div>
          </div>
        ))}
      </div>
    </Container>

  );
};

export default Rooms;