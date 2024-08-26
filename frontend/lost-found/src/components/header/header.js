import React from 'react';
import {Link} from 'react-router-dom';

const header = (props) => {
    // let authenticate
    // if (localStorage.getItem("JWT")) {
    //     authenticate = (<button className="btn btn-outline-info my-2 my-sm-0"
    //                             onClick={() => localStorage.removeItem("JWT")}>Logout</button>);
    // } else {
    //     authenticate = (<Link className="btn btn-outline-info my-2 my-sm-0" to={"/login"}>Login</Link>);
    // }

    return (
        <header className="p-3 text-bg-dark">
            <div
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start d-print-none">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img src={'../../io.png'} style={{width: '25px'}} alt={'image'}/>
                </a>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
                    style={{marginLeft: '80%'}}>
                    <li>
                        <Link className="nav-link px-2 text-white" to={"/items"}>Items</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default header;
