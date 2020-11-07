import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io';

const EditorContext = createContext();

export const useAppEditor = () => {
    return useContext(EditorContext);
}

export const EditorProvider = ({ children }) => {
    
    function connect() {

    }

    return (
        <EditorContext.Provider value={{connect}}>
            { children }
        </EditorContext.Provider>
    );
}