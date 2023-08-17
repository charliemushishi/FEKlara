import React, {useState} from 'react';
import { useNotification } from '../components/notificationcontext'; // Update the path
import './notifications.css'


const CustomNotification = () => {
    const { notifications, removeNotification } = useNotification(); 

    return (
        <div className="notification-container">
                <div className='spriteborder'>
                    <div className="sprite">
                    {notifications.length > 0 ? (
                    notifications.map((notification) => (
                    <img
                    key={notification.timestamp}
                    src={`assets/${notification.type}.GIF`}
                    alt={notification.type}
                    />
                    ))
                    ) : (
                    <img src="assets/hi.GIF" alt="Default" />
                    )}
                    </div>
                    <div className='notification-dialogue'>
                    <p>Klara:</p>
                    {notifications.map((notification) => (
                    <div key={notification.timestamp} className={`notification ${notification.type}`}>
                    {notification.message}
                    <button
                    className="dismiss-button"
                    onClick={() => removeNotification(notification.timestamp)}
                    >
                    &#x2716;
                    </button>

                    </div>
                
            ))}
            </div>
            </div>
        </div>
    );
};

export default CustomNotification;
