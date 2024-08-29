import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../custom-axios/axios';
import itemService from "../../service/itemService";

// TODO pass receiver
const Mail = () => {
    // const location = useLocation();
    // const navigate = useNavigate();
    // const { receiver } = location.state || {};

    const { id } = useParams();
    const [mailData, setMailData] = useState({ username: '', receiver: { email: '' }});
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(id);
    }, [id]);

    const fetchData = (id) => {
        loadReceiver(id);
    };

    const loadReceiver = (id) => {
        itemService.getReceiver(id)
            .then(response => {
                setMailData(response.data);
            })
            .catch(error => {
                console.error('Error fetching mail data:', error);
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const mail = { receiver: mailData.receiver.email, subject, message };
        axios.post('/users/send', mail, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin' : '*',
            }
        })
            .then(response => {
                navigate("/items");
            })
            .catch(error => {
                console.error('Error sending mail:', error);
            });
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="receiver" className="form-label">Send to:</label>
                    <input
                        type="text"
                        id="receiver"
                        name="receiver"
                        value={mailData.receiver.email}
                        readOnly
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="form-control"
                        style={{ width: '90rem' }}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Send</button>
            </form>
        </div>
    );
};

export default Mail;
