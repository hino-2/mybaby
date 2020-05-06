import React from "react"
import { Switch, Route, withRouter }      from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import HomePage from '../HomePage'
import Baby     from '../Baby'
import Login    from '../Login'
import Logout   from '../Logout'
import './style.scss'

const Container = ({ location }) => (
    <div className="container">
        <TransitionGroup className="transition-group">
            <CSSTransition
                key={location.key}
                timeout={{ enter: 300, exit: 300 }}
                classNames="fade">
                <section className="route-section">
                    <Switch location={location}>
                        <Route path="/" exact       component={HomePage} />
                        <Route path="/babies/:name" component={Baby} />
                        <Route path="/login"        component={Login} />
                        <Route path="/logout"       component={Logout} />
                    </Switch>
                </section>
            </CSSTransition>
      </TransitionGroup>        
    </div>
);

export default withRouter(Container);
