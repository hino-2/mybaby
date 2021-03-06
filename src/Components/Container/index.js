import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import HomePage from "../HomePage";
import Baby from "../Baby";
import Register from "../Register";
import Login from "../Login";
import Logout from "../Logout";
import LK from "../LK";
import WeightCalc from "../WeightCalc";
import "./style.scss";

const Container = ({ location }) => (
	<div className="container">
		<TransitionGroup className="transition-group">
			<CSSTransition key={location.key} timeout={{ enter: 300, exit: 300 }} classNames="fade">
				<section className="route-section">
					<Switch location={location}>
						<Route path="/" exact component={HomePage} />
						<Route path="/babies/:name" component={Baby} />
						<Route path="/register" component={Register} />
						<Route path="/login" component={Login} />
						<Route path="/logout" component={Logout} />
						<Route path="/lk" component={LK} />
						<Route path="/weightCalc" component={WeightCalc} />
					</Switch>
				</section>
			</CSSTransition>
		</TransitionGroup>
	</div>
);

export default withRouter(Container);
