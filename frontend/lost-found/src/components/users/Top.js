import React, { useEffect, useState } from 'react';
import axios from '../../custom-axios/axios';
import itemService from "../../service/itemService";
import gold from '../../assets/gold.jpg'
import silver from '../../assets/silver.jpg'
import bronze from '../../assets/bronze.jpg'

const TopUsers = () => {
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        loadUsers();
    };

    const loadUsers = () => {
        itemService.getTopUsers()
            .then(response => {
                setTopUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching top users:', error);
            });
    }

    const renderPlaceImage = (index) => {
        const style = {
            width: '24px',
            height: '24px'
        };

        if (index === 0) {
            return <img src={gold} alt="First Place" style={style}/>;
        } else if (index === 1) {
            return <img src={silver} alt="Second Place" style={style}/>;
        } else if (index === 2) {
            return <img src={bronze} alt="Third Place" style={style}/>;
        }
        return null;
    };

    return (
        <div className="top-users">
            <h3>Top Users</h3>
            <ul className="list-group">
                {topUsers.map((user, index) => (
                    <li key={user.id} className="list-group-item d-flex align-items-center">
                        <span className="user-name ml-2">{user.name} - {user.points} Points</span>
                        {renderPlaceImage(index)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopUsers;
