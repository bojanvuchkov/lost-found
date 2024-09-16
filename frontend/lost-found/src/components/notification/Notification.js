import React, {useEffect, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import itemService from "../../service/itemService";
import {Link, useParams} from "react-router-dom";
import {format} from "date-fns";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';

const customStyles = {
    content: {
        top: '30%',
        left: '80%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        maxHeight: '500px',
        overflowY: 'auto',
    },
};

Modal.setAppElement('#root');

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        itemService.getUser(localStorage.getItem('userId'))
            .then(response => {
                setNotifications(response.data.receivedEmails)
            })
            .catch(error => {
                console.error('Error fetching mail data:', error);
            });
    }, []);

    const toggleModal = () => {
        itemService.getUser(localStorage.getItem('userId'))
            .then(response => {
                setNotifications(response.data.receivedEmails)
            })
        setModalIsOpen(!modalIsOpen);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="App">
            <button className="nav-link px-2 text-white" onClick={toggleModal}>
                <FontAwesomeIcon icon={faBell}/>
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                style={customStyles}
                contentLabel="Notifications"
            >
                <h2>Notifications</h2>
                <ul>
                    {notifications.length > 0 ? (
                        notifications.map((notif, index) => (
                            <li key={index}>
                                <span style={{fontWeight: 'bold'}}>{notif.subject}: </span>
                                {!isNaN(notif.message)?(
                                <span>Check this
                                    <Link to={`/items/${notif.message}`}
                                          onClick={closeModal}>
                                         item
                                    </Link>
                                </span>):<span>{notif.message}</span>
                                }
                                <span> - {notif.sender.email} </span>
                                <small>{format(notif.dateTime, 'dd.MM.yyy hh:MM')}</small>
                            </li>
                        ))
                    ) : (
                        <p>No notifications yet</p>
                    )}
                </ul>
                <button className={'btn btn-outline-dark'} onClick={toggleModal}>Close</button>
            </Modal>
        </div>
    );
}

export default Notification;
