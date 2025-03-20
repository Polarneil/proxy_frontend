import React from 'react';
import '../css/not_found.css';

function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <div className='not-found-headers'>404 - Page Not Found</div>
            <p className='not-found-text'>The page you are looking for does not exist.</p>
            <p className='not-found-text'>You may have mistyped the address or the page may have been removed.</p>
        </div>
    );
}

export default NotFound;
