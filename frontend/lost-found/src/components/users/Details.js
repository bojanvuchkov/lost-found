import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import itemService from "../../service/itemService";
import { format } from 'date-fns';

const UserDetails = () => {
    const [loggedInUser, setLoggedInUser] = useState([]);
    const [items, setItems] = useState([]);
    const [receivedEmails, setReceivedEmails] = useState([]);
    const {id} = useParams()

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        loadUser();
    };

    const loadUser = () => {
        itemService.getUser(id)
            .then((data) => {
                setLoggedInUser(data.data.loggedInUser);
                setItems(data.data.items);
                setReceivedEmails(data.data.receivedEmails);
            })
    }

    const handleDelete = (id) => {
        itemService.deleteItem(id)
            .then(() => {
                setItems(items.filter(item => item.id !== id));
            })
            .catch(error => {
                console.error("Error deleting item:", error);
            });
    };

    const handleDeleteMessage = (id, messageId) => {
        itemService.deleteMessage(id, messageId)
            .then(() => {
                setReceivedEmails(receivedEmails.filter(email => email.id !== messageId));
            })
            .catch(error => {
                console.error("Error deleting item:", error);
            });
    };

    return (
        <div className="mt-4">
            <div className="row">
                <div className="col-2" style={{fontSize: '18px'}}>
                    <h1>User Details</h1>
                    <h4>{loggedInUser?.name}</h4>
                </div>
                <div className="col-10">
                    <h1>Messages</h1>
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col-2">Sent by</th>
                            <th scope="col-2">Subject</th>
                            <th scope="col-3">Message</th>
                            <th scope="col-2">Sent on</th>
                            <th scope="col-1">#</th>
                        </tr>
                        </thead>
                        <tbody>
                        {receivedEmails.map((email) => (
                            <tr key={email.id}>
                                <td>
                                    <Link to={`/users/contact/${email.sender.id}`}>
                                        {email.sender.email}
                                    </Link>
                                </td>
                                <td>{email.subject}</td>
                                <td>{email.message}</td>
                                <td>{format(email.dateTime,'dd.MM.yy hh:MM')}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteMessage(loggedInUser.id, email.id)}
                                        className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <h1>My items</h1>
                {items.map((item) => (
                    <div key={item.id} className="card m-1 d-flex" style={{maxWidth: '49%', paddingBottom: 0}}>
                        <div className="row g-0">
                            <div className="col-md-6 pt-2 pb-2">
                                <img src={`data:image/jpeg;base64,` + item.image} className="img-fluid w-100"
                                     alt={''}/>
                            </div>
                            <div className="col-md-5" style={{fontSize: '14px'}}>
                                <div className="card-body">
                                    <h5 className="card-title mb-1">{item.name}</h5>
                                    <p className="card-text mb-1">
                                        <strong>Description:</strong> {item.description}
                                    </p>
                                    <p className="card-text mb-1">
                                        <strong>Category:</strong> {item.category}
                                    </p>
                                    <p className="card-text mb-1">
                                        <strong>Location:</strong> {item.location}
                                    </p>
                                    <p className="card-text mb-1">
                                        <strong>Type:</strong> {item.isLost ? 'Lost' : 'Found'}
                                    </p>
                                    {item.user.id === loggedInUser.id ? (
                                        <p className="card-text mb-1">
                                            <strong>Published by:</strong> {item.user.name}
                                        </p>
                                    ) : (
                                        <p className="card-text mb-1">
                                            <strong>Published by:</strong>
                                            <Link to={`/users/contact/${item.user.id}`}>{item.user.name}</Link>
                                        </p>
                                    )}
                                    <p className="card-text mb-1">
                                        <strong>Status:</strong> {item.status}
                                    </p>
                                    <p className="card-text mb-1">
                                        <small className="text-body-secondary">{format(item.dateRegistered,'dd.MM.yy hh:MM')}</small>
                                    </p>
                                    <div className="col-md-2 mt-auto pb-2">
                                        <Link to={`/items/edit/${item.id}`} state={item} className="btn btn-success text-center"
                                              style={{width: '70px'}}>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="btn btn-danger text-center mt-2">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserDetails;
