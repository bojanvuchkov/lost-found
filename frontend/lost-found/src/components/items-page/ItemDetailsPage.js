import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../custom-axios/axios';
import { format } from 'date-fns';
import './ItemDetails.css'; // Import custom CSS for modern design

const ItemDetailsPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        fetchItemDetails(id);
    }, [id]);

    const fetchItemDetails = async (itemId) => {
        try {
            const response = await axios.get(`/items/${itemId}`);
            setItem(response.data);
        } catch (error) {
            console.error('Error fetching item details:', error);
        }
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card mb-4 item-details-card">
                <div className="row g-0">
                    <div className="col-md-6 p-2">
                        <img
                            src={`data:image/jpeg;base64,` + item.image}
                            className="img-fluid w-100 item-image"
                            alt={item.name}
                        />
                    </div>
                    <div className="col-md-6 p-4">
                        <h2 className="card-title mb-3 item-title">{item.name}</h2>
                        <p className="card-text mb-2"><strong>Description:</strong> {item.description}</p>
                        <p className="card-text mb-2"><strong>Category:</strong> {item.category}</p>
                        <p className="card-text mb-2"><strong>Location:</strong> {item.location}</p>
                        <p className="card-text mb-2"><strong>Type:</strong> {item.type === 'lost' ? 'Lost' : 'Found'}</p>
                        <p className="card-text mb-2"><strong>Status:</strong> {item.status}</p>
                        <p className="card-text mb-2">
                            <strong>Published by:</strong> {localStorage.getItem('userId') !== item.user.id ? (
                            <Link to={`/users/contact/${item.user.id}`} className="contact-link">
                                {item.user.name}
                            </Link>
                        ) : (
                            item.user.name
                        )}
                        </p>
                        <p className="card-text text-muted mb-0">
                            <small>Published on: {format(new Date(item.dateRegistered), 'dd.MM.yyyy hh:mm')}</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailsPage;
