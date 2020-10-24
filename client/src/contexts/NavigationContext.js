import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useAccount = () => {
    return useContext(NavigationContext);
}

export const NavigarionProvider = ({ children }) => {
    const [components, setComponents] = useState();

    return (
        <NavigationContext.Provider value={{components, setComponents}}>
            { children }
        </NavigationContext.Provider>
    );
}