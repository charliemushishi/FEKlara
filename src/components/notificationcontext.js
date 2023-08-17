import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    
    const addNotification = (message, type) => {
        const newNotification = {
        message,
        type,
        timestamp: new Date().getTime(),
        };
        setNotifications([...notifications, newNotification]);
    };

    const removeNotification = (timestamp) => {
        const updatedNotifications = notifications.filter(
        (notification) => notification.timestamp !== timestamp
        );
        setNotifications(updatedNotifications);
    };

    return (
        <NotificationContext.Provider
        value={{ notifications, addNotification, removeNotification }}
        >
        {children}
        </NotificationContext.Provider>
    );
    };

    export const useNotification = () => {
    return useContext(NotificationContext);
};
