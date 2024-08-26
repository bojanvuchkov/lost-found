import React, { useState } from 'react';

const FilterForm = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        name: '',
        isLost: 'All',
        status: 'OPEN',
        category: 'All',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFilter(filters);
    };

    return (
        <form className="form-inline" onSubmit={handleSubmit}>
            <label htmlFor="name" className="form-label">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                style={{ display: 'inline', width: '18%' }}
                placeholder="Enter item name"
                value={filters.name}
                onChange={handleInputChange}
            />

            <label htmlFor="isLost" className="form-label">Type</label>
            <select
                id="isLost"
                name="isLost"
                className="form-control"
                style={{ display: 'inline', width: '18%' }}
                value={filters.isLost}
                onChange={handleInputChange}
            >
                <option value="All">All</option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
            </select>

            <label htmlFor="status" className="form-label">Status</label>
            <select
                id="status"
                name="status"
                className="form-control"
                style={{ display: 'inline', width: '18%' }}
                value={filters.status}
                onChange={handleInputChange}
            >
                <option value="OPEN">OPEN</option>
                <option value="RESOLVED">RESOLVED</option>
            </select>

            <label htmlFor="category" className="form-label">Category</label>
            <select
                id="category"
                name="category"
                className="form-control"
                style={{ display: 'inline', width: '18%' }}
                value={filters.category}
                onChange={handleInputChange}
            >
                <option value="All">All</option>
                {/* Map over categories if you have them fetched from an API */}
                {/* categories.map(cat => <option key={cat} value={cat}>{cat}</option>) */}
            </select>

            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    );
};

export default FilterForm;
