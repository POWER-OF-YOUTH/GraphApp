import React, { createContext, useContext, useEffect, useState } from 'react';


const EditorContext = createContext();

export const useAppEditor = () => {
    return useContext(EditorContext);
}

export const EditorProvider = ({ children }) => {
    
    function connect() {

    }

    const [selectedTool, setSelectedTool] = useState('cursor');

    return (
        <EditorContext.Provider value={{connect, selectedTool, setSelectedTool}}>
            { children }
        </EditorContext.Provider>
    );
}