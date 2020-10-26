import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition';
import './App.css';

import PhoneLayout from './Layouts/PhoneLayout';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Stake from './pages/Stake';
import BuyPhone from 'pages/BuyPhone';
import BuyIphone from 'pages/BuyIphone';
import IphoneCollection from 'pages/IphoneCollection';

function App() {
  return (
    <Router>
      <div className='App'>
        {/* <HeaderPage /> */}
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/phone' component={PhoneLayout} />

          {/* Route pages */}
          <Route
            render={({ location }) => {
              let query = new URLSearchParams(location.search);
              let preset = query.get('preset') ? query.get('preset') : '';
              return (
                <PageTransition preset={preset} transitionKey={location.pathname}>
                  <Switch location={location}>
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/stake' component={Stake} />
                    <Route exact path='/buy-Phone' component={BuyPhone} />
                    <Route exact path='/buy-Iphone' component={BuyIphone} />
                    <Route exact path='/collection' component={IphoneCollection} />
                  </Switch>
                </PageTransition>
              );
            }}
          />
        </Switch>
        {/* <FooterPage /> */}
      </div>
    </Router>
  );
}

export default App;
