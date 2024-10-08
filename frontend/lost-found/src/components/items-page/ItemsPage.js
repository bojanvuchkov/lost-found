import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ItemsPage.css';
import FilterForm from "../filter/FilterForm";
import axios from "../../custom-axios/axios";
import Pagination from "../pagination/Pagination";
import {Link} from "react-router-dom";
import { format } from 'date-fns';
import TopUsers from "../users/Top";

const ItemsPage = (categories) => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const fetchItems = async (filters = {}) => {
        try {
            const response = await axios.get('/items', {
                params: {
                    ...filters,
                    pageNum: currentPage,
                    size: pageSize
                }
            });
            setItems(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchItems({});
    }, []);

    const handleFilter = (filters) => {
        fetchItems(filters);
    };

    useEffect(() => {
        fetchItems();
    }, [currentPage, pageSize]);


    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage);
    };


    const handlePageSizeChange = (size) => {
        setPageSize(parseInt(size));
        setCurrentPage(1);
    };

    return (
        <div className="container mt-4">
            <Link to="/items/add" state={{item: null}} className="btn btn-dark mb-4 w-100">
                Add New Item
            </Link>

            <div className="row">
                <div className="col-md-9">
                    <div className="row mb-2">
                        <FilterForm onFilter={handleFilter} categories={categories}/>
                    </div>

                    <div className="row">
                        {items.map(item => (
                            <div className="card m-1 d-flex" style={{maxWidth: '49%', paddingBottom: '0'}}
                                 key={item.id}>
                                <div className="row g-0">
                                    <div className="col-md-6 pt-2 pb-2">
                                        <img src={`data:image/jpeg;base64,` + item.image} className="img-fluid w-100"
                                             alt={'image'}/>
                                    </div>
                                    <div className="col-md-6 p-2" style={{fontSize: '14px', paddingBottom: '0'}}>
                                        <div className="card-body" style={{paddingBottom: '0'}}>
                                            <h5 className="card-title mb-1">{item.name}</h5>
                                            <p className="card-text mb-1">
                                                <strong>Description:</strong>{item.description}</p>
                                            <p className="card-text mb-1"><strong>Category:</strong>{item.category}</p>
                                            <p className="card-text mb-1"><strong>Location:</strong>{item.location}</p>
                                            <p className="card-text mb-1">
                                                <strong>Type:</strong>{item ? 'Lost' : 'Found'}</p>
                                            <p className="card-text mb-1"><strong>Status:</strong>{item.status}</p>
                                            <p className="card-text">
                                                <strong>Published by:</strong>
                                                {localStorage.getItem('userId') !== item.user.id ? (
                                                    <Link to={`/users/contact/${item.user.id}`}>
                                                        {item.user.name}
                                                    </Link>
                                                ) : (
                                                    item.user.name
                                                )}
                                            </p>
                                            <p className="card-text"><small
                                                className="text-muted">{format(item.dateRegistered, 'dd.MM.yyy hh:MM')}</small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        pageSize={pageSize}
                        onPageSizeChange={handlePageSizeChange}
                        totalElements={totalElements}
                    />
                </div>
                <div className="col-md-3">
                    <TopUsers/>
                </div>
            </div>
        </div>
    );
};

export default ItemsPage;
