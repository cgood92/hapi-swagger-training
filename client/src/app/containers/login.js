import React from 'react';

import Login from '../components/Login/Login';

import { selectUser } from '../reducers/user';
import { login } from '../actions/user';
import { connect } from 'react-redux';

import * as api from '../services/api';
import serialize from 'form-serialize';

export class LoginContainer extends React.Component { 
	constructor(props) {
		super(props);
		this.state = {};
	}

	submit(e) {
		const form = serialize(e.target, { hash: true }),
			{ username, password } = form;

		this.setState({ status: 'loading' });

		api.login(username, password)
			.then(user => {
				if(user) {
					return this.props.dispatch(login(user, username, password));
				} else {
					return this.setState({ status: 'badAttempt' });
				}
			}).catch(err => {
				console.log('There was an error in logging in', err);
				this.setState({ status: 'badAttempt' });
			});

		e.preventDefault();
		return false;
	}

	render() {
		const { status = null } = this.state;
  		return (<Login handlers={{ submit: this.submit.bind(this) }} status={status} />);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
  	dispatch
	};
};

export default connect(selectUser, mapDispatchToProps)(LoginContainer);
