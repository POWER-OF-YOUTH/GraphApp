import React from 'react';
import cog from './icons/cog.svg';
import { AccountProvider } from './contexts/AccountContext';

function App() {
  return (
    <AccountProvider>
      <h2>Hello, world!</h2>
    </AccountProvider>
  );
}

export default App;
