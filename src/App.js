import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mobileView, desktopView } from './store/actions/actions';

class App extends Component {
	componentDidMount() {
		window.addEventListener('load', () => {
			if (window.innerWidth > 760) {
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
			<div>
				<button onClick={this.props.handleDesktopView}>click</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		view: state.screenView
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
