import {Component} from 'react';

export default class extends Component {

	constructor(props) {
		super(props);

		let {loading, error, wait} = {
			loading: true,
			error: false,
			wait: false,
			...props
		};

		this.state = { wait, loading, error };
	}

	componentWillMount() {
		const onLoad = this.props.onLoad();

		if(onLoad.then && onLoad.catch) {
			onLoad
				.then(() => this.setState({loading: false, error: false}))
				.catch( ({message}) => this.setState({loading: false, error: true, message}));
		}
	}

	renderStatus() {
		const { error, loading } = this.state;

		return (
			<div>
				<h1>
					{error && "An Error Occurred"}
					{loading && "Loading..."}
				</h1>
			</div>
		);
	}


	render() {
		const { wait, error, loading } = this.state;
		const {children} = this.props;

		if(wait && (error || loading) ) {
			return this.renderStatus();
		}

		return children;
	}

}
