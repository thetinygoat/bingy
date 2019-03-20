import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mobileView, desktopView } from './store/actions/actions';
import Home from './pages/Home/Home';
import ContentPage from './pages/ContentPage/ContentPage';
import BottomBar from './components/BottomBar/BottomBar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Search from './pages/Search/Search';
class App extends Component {
	state = {
		loggedIn: false
	};
	componentDidMount() {
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
	render() {
		return (
			<BrowserRouter>
				<div>
					<Navbar />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/search" component={Search} />
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
