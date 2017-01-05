import { Component } from 'react';

export default class MountLoad extends Component {

	constructor(props) {
		super( props );
		this.state  = { loading: true, error: false };
	}

	componentDidMount() {
		const onLoad = this.props.onLoad();

		if(onLoad.then && onLoad.catch) {
			return onLoad
				.then( () => this.setComplete() )
				.catch( ({message}) => this.setError(message) );
		}
	}

	setComplete() {
		this.setState({loading: false, error: false});
	}

	setError(message) {
		this.setState({loading: false, error: true, message});
	}

	renderError() {
		return (
			<div>
				<h1>An Error Occurred</h1>
				<span>{this.state.message}</span>
			</div>
		);
	}

	renderLoading() {
		return <h1>Loading...</h1>
	}

	render() {
		const { error, loading } = this.state;
		const { wait, children } = this.props;

		if(error) {
			return this.renderError();
		}

		if( loading && wait ) {
			return this.renderLoading();
		}

		return children;
	}

}
