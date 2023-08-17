import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const MAX_NOTIFICATIONS = 4;

    const addNotification = (message, type) => {
        const newNotification = {
        message,
        type,
        timestamp: new Date().getTime(),
        };
        
        const updatedNotifications = [newNotification, ...notifications].slice(0, MAX_NOTIFICATIONS)
        setNotifications(updatedNotifications)
    };


    const removeNotification = useCallback((timestamp) => {
        const updatedNotifications = notifications.filter(
            (notification) => notification.timestamp !== timestamp
        );
        setNotifications(updatedNotifications);
    }, [notifications]);

    useEffect(() => {
        if (notifications.length > 0) {
            const timer = setTimeout(() => {
                removeNotification(notifications[0].timestamp);
            }, 5000); // Adjust the time interval as needed
            return () => clearTimeout(timer);
        }
    }, [notifications, removeNotification]);
    // const removeNotification = (timestamp) => {
    //     const updatedNotifications = notifications.filter(
    //     (notification) => notification.timestamp !== timestamp
    //     );
    //     setNotifications(updatedNotifications);
    // };

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
