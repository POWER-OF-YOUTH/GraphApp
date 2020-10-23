import React, { createContext, useContext, useState } from 'react';

const AccountContext = createContext();

export const useAccount = () => {
    return useContext(AccountContext);
}

export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState({name: 'Daniil'});

    return (
        <AccountContext.Provider value={{account, setAccount}}>
            { children }
        </AccountContext.Provider>
    );
}