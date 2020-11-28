import React from 'react';
import cog from './icons/cog.svg';
import { AccountProvider } from './contexts/AccountContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RegisterPage from './pages/RegisterPage';
import EditorPage from './pages/EditorPage';
import Navigation from './components/Navigation';
import { NavigationProvider } from './contexts/NavigationContext';
import { EditorProvider } from './contexts/EditorContext';

function App() {
  return (
    <AccountProvider>
      <EditorProvider>
        <NavigationProvider>
          <Navigation>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/editor" component={EditorPage} />
          </Switch>
          </Navigation>
        </NavigationProvider>
      </EditorProvider>
    </AccountProvider>
  );
}

export default App;
