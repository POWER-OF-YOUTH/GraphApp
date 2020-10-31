import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
    return useContext(NavigationContext);
}

export const NavigationProvider = ({ children }) => {
    const [tools, setTools] = useState();

    return (
        <NavigationContext.Provider value={{tools, setTools}}>
            { children }
        </NavigationContext.Provider>
    );
}