import React, { createContext, useContext, useState } from 'react';

const AccountContext = createContext();

export const useAccount = () => {
    return useContext(AccountContext);
}

export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState({
        login: 'Bot',
        name: 'Michael',
        surname: 'Botov'
    });

    return (
        <AccountContext.Provider value={{account, setAccount}}>
            { children }
        </AccountContext.Provider>
    );
}