import React from 'react';

import Home from '../components/Home';
import { connect } from 'react-redux';

import mountLoad from '../hocs/mount-load';
import { wrap } from '../hocs/ss-resolve';

import { init as charactersInit } from '../actions/characters';
import { selectCharacters } from '../reducers/characters';

export class HomeContainer extends React.Component { 

	render() {
		const { characters = [] } = this.props;
		return (<Home
			characters={characters}
		/>);
	}
}

const mapDispatchToProps = (dispatch) => ({
	onLoad: () => dispatch( charactersInit() )
});

const LazyHome = mountLoad(HomeContainer);
const resolveOnServer = (props, store) => store.dispatch(charactersInit());
const SSResolvedComponent = wrap(LazyHome, resolveOnServer)

export default connect(selectCharacters, mapDispatchToProps)(SSResolvedComponent);
