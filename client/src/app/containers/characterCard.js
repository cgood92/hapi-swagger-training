import React from 'react';

import CharacterCard from '../components/CharacterCard';
import { connect } from 'react-redux';

import { init as characterVotesInit } from '../actions/characterVotes';
import { selectCharacters } from '../reducers/characters';

import * as api from '../services/api';

export class CharacterCardContainer extends React.Component { 
  constructor(props){
  	super(props);
  	// Must be "falsey" initially, for logic to work out
  	this.state = { loadingVotes: null };
  }

  componentDidMount() {
  	const { dispatch, id } = this.props;
  	characterVotesInit(dispatch, id);
  }

  voteUp() {
  	const { id } = this.props;
  	this.setState({ loadingVotes: true });
  	api.voteForCharacter(id,'up').then(() => this.setState({ loadingVotes: false })).catch((err) => console.log('Posting vote failed...', err));
  }

  voteDown() {
  	const { id } = this.props;
  	this.setState({ loadingVotes: true });
  	api.voteForCharacter(id,'down').then(() => this.setState({ loadingVotes: false })).catch((err) => console.log('Posting vote failed...', err));
  }

  render() {
    	let loadingVotes = !this.props.votesLoaded || (this.state.loadingVotes === true);
    	return (<CharacterCard
    	  {...this.props}
    	  handlers={{
      		voteUp: this.voteUp.bind(this),
      		voteDown: this.voteDown.bind(this)
    	  }}
    	  loadingVotes={loadingVotes}
    	/>);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  	dispatch
  };
};

export default connect(selectCharacters, mapDispatchToProps)(CharacterCardContainer);
