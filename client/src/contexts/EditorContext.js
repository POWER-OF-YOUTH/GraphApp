import React, { createContext, useContext, useEffect, useState } from 'react';


const EditorContext = createContext();

export const useAppEditor = () => {
    return useContext(EditorContext);
}

export const EditorProvider = ({ children }) => {
    
    function connect() {

    }

    const [selectedTool, setSelectedTool] = useState('cursor');
    const [marks, setMarks] = useState({container: new Map()});
    const x = {
            человек: [
                {
                    propertyName: 'Name',
                    require: true,
                    default: 'Name'
                },
                {
                    propertyName: 'Age',
                    require: false,
                    default: 0
                }
            ]
        }

    return (
        <EditorContext.Provider value={{connect, selectedTool, setSelectedTool, marks, setMarks}}>
            { children }
        </EditorContext.Provider>
    );
}
