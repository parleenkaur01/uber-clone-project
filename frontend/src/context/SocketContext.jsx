//creates a socket.io connection and makes it available to your entire react app using React context
import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); //cONNECT TO BACKEND socket SERVER 

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        

    }, []);


    return (
        <SocketContext.Provider value={{socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;