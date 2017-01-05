import React from 'react';

import AppLayout from '../components/AppLayout';

import { selectUser } from '../reducers/user';
import { logout } from '../actions/user';

import { connect } from 'react-redux';

export class AppLayoutContainer extends React.Component { 

	logout() {
		this.props.dispatch(logout());
	}

	render() {
  	const { homelink, children, user: { isLoggedIn = false } } = this.props;
  		return (<AppLayout homelink={homelink} children={children} isLoggedIn={isLoggedIn} handlers={{logout: this.logout.bind(this) }}/>);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch
	};
};

export default connect(selectUser, mapDispatchToProps)(AppLayoutContainer);
