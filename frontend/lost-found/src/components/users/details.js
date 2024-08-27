import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import itemService from "../../service/itemService";

//TODO pass all props
const UserDetails = () => {
    // const isUserLoggedIn = loggedInUser && loggedInUser.id; // Assuming loggedInUser object is provided
    const [loggedInUser, setLoggedInUser] = useState([]);
    const [items, setItems] = useState([]);
    const [dateTimesEmails, setDateTimesEmails] = useState([]);
    const [receivedEmails, setReceivedEmails] = useState([]);
    const [dateTimes, setDateTimes] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        loadUser();
    };

    //TODO for the purpose of testing user details, edit/delete item
    const loadUser = () => {
        itemService.getUser()
            .then((data) => {
                console.log(data)
                setLoggedInUser(data.data.loggedInUser);
                setItems(data.data.items);
                setDateTimesEmails(data.data.dateTimesEmails);
                setReceivedEmails(data.data.receivedEmails);
                setDateTimes(data.data.dateTimes);
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
                                <td>{dateTimesEmails[email.id]}</td>
                                <td>
                                    <form
                                        action={`/users/${loggedInUser.id}/deleteMessage/${email.id}`}
                                        method="post"
                                    >
                                        <input type="submit" className="btn btn-danger" value="Delete"/>
                                    </form>
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
                                     alt={'image'}/>
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
                                        <small className="text-body-secondary">{dateTimes[item.id]}</small>
                                    </p>
                                    <div className="col-md-2 mt-auto pb-2">
                                        <Link to={`/items/edit/${item.id}`} className="btn btn-success text-center"
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
