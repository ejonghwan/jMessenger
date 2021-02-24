import React, { useState } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth'
import Home from 'routes/Home'
import Profile from 'routes/Profile'
import Navigation from 'components/Navigation'

const AppRouter = ({ isLoggedIn }) => {

    return (
        <Router>
            { isLoggedIn && <Navigation /> }
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/Profile">
                            <Profile />
                        </Route>
                        <Redirect from="*" to="/"/> {/* 어디에서 어디로 이동. 이거아니면 히스토리객체 이용 */}
                    </>
                ) : (
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <Redirect from="*" to="/"/>
                    </>
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;