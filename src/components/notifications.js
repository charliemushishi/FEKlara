import React, {useState} from 'react';
import { useNotification } from '../components/notificationcontext'; // Update the path
import './notifications.css'


const CustomNotification = () => {
    const { notifications, removeNotification } = useNotification(); 

    let latestNotification = null;

    if (notifications.length > 0) {
        latestNotification = notifications[0];
    }

    return (
        <div className="notification-container">
                <div className='spriteborder'>
                    <div className="sprite">


                    {latestNotification ? (
                        <img
                            src={`assets/${latestNotification.type}.GIF`}
                            alt={latestNotification.type}
                        />
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
