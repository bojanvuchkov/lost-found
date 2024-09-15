import React, { useState } from 'react';
import axios from '../../custom-axios/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useLocation, useNavigate} from "react-router-dom";

const AddItem = (categories) => {
    const location = useLocation();
    const navigate = useNavigate();
    const item = location.state || {};
    const url = item.id === undefined ? '/items/add' : `/items/edit/${item.id}`;

    const [formData, setFormData] = useState({
        userId: localStorage.getItem("userId"),
        name: item?.name || '',
        description: item?.description || '',
        isLost: item?.isLost || 'Lost',
        status: item?.status || 'OPEN',
        category: item?.category || 'PHONES',
        location: item?.location || '',
        file: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = new FormData();
        for (const key in formData) {
            submitData.append(key, formData[key]);
        }
        try {
            const response = await axios.post(url, submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin' : '*',
                },
            });
            navigate('/items');
        } catch (error) {
        }
    };

    return (
        <div className="container mt-4" style={{ marginLeft: '30%', width: '40%' }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter item name"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter item description"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="isLost" className="form-label">Lost/Found</label>
                    <select
                        id="isLost"
                        name="isLost"
                        className="form-select"
                        value={formData.isLost}
                        onChange={handleInputChange}
                    >
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                    </select>
                </div>

                {item && (
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            id="status"
                            name="status"
                            className="form-select"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="OPEN">Open</option>
                            <option value="RESOLVED">Resolved</option>
                            <option value="CANCELED">Canceled</option>
                        </select>
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={formData.category}
                        onChange={handleInputChange}
                    >
                        {categories.categories.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {item && item.image && (
                    <div className="mb-3">
                        <img
                            src={`data:image/jpeg;base64,${item.image}`}
                            className="d-block w-25"
                            alt="Item"
                        />
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Image</label>
                    <input
                        multiple
                        type="file"
                        id="file"
                        name="file"
                        accept="image/png, image/jpeg"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter item location"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <SendNotification></SendNotification>
            </form>
        </div>
    );
};

export default AddItem;
