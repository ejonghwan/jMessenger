import React from 'react';
import { Link } from 'react-router-dom'

const Navigation = ({ user }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">home</Link>
                </li>
                <li>
                    <Link to="/profile">{`${user.displayName}의 profile`}</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;