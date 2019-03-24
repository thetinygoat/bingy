import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mobileView, desktopView } from './store/actions/actions';
import Home from './pages/Home/Home';
import ContentPage from './pages/ContentPage/ContentPage';
import BottomBar from './components/BottomBar/BottomBar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Search from './pages/Search/Search';
import Profile from './pages/Profile/Profile';
import MobileLogin from './pages/MobileLogin/MobileLogin';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-136783569-1');

class App extends Component {
	state = {
		loggedIn: false
	};
	componentWillMount() {
		window.addEventListener('load', () => {
			if (window.innerWidth > 730) {
				this.props.handleDesktopView();
			} else {
				this.props.handleMobileView();
			}
		});
		window.addEventListener('resize', () => {
			if (window.innerWidth > 760) {
				this.props.handleDesktopView();
			} else {
				this.props.handleMobileView();
			}
		});
	}
	componentDidMount() {
		ReactGA.pageview('/');
	}
	componentWillUnmount() {
		window.removeEventListener('load', null);
		window.removeEventListener('resize', null);
	}
	render() {
		return (
			<BrowserRouter>
				<div>
					<Navbar />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/search" component={Search} />
						{/* {this.props.auth.isLoggedIn ? (
							
						) : (
							<Redirect to="/mobile/login" />
						)} */}
						<Route path="/profile/:id" component={Profile} />
						<Route path="/mobile/login" component={MobileLogin} />
						<Route path="/content/:id" component={ContentPage} />
					</Switch>
					{this.props.view.isMobile && <BottomBar />}
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => {
	return {
		view: state.screenView,
		auth: state.auth
	};
};
const mapDispatchToProps = dispatch => {
	return {
		handleDesktopView: () => dispatch(desktopView()),
		handleMobileView: () => dispatch(mobileView())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
