'use strict';

const boom = require('boom'),
	joi = require('joi'),
	db = require('../data/firebase-connector');

// Schema: post
const postVoteForCharacterById = (server) => (request, reply) => {
	const { id: character_id } = request.params,
		{ type } = request.payload,
		// Get the user ID from auth object, which is provided by the hapi-auth-basic plugin
		user_id = request.auth.credentials.id,
		// Making a composite key so that we can query based on 2 objects at the same time
		compositeKeyName = 'user_id:character_id',
		compositeKey = `${user_id}:${character_id}`,
		vote = {
			character_id,
			user_id,
			type,
			[compositeKeyName]: compositeKey
		};

	// Check to see if vote has already been placed for this user/character combination
	db.database()
		.ref('votes/characters')
		.orderByChild(compositeKeyName)
		.equalTo(compositeKey)
		.once('value').then(snapshot => {
			// There is not a vote for this user/character combination...
			if (!snapshot.exists()) {
				// Push vote to database
				return db.database().ref('votes/characters').push(vote);
			}
			// There is a vote for this user/character combination...
			else {
				let oldSnapshot = snapshot.val(),
					key = Object.keys(oldSnapshot)[0];
				oldSnapshot = oldSnapshot[key];
				// If this vote is different than it was previously, update it
				if (type !== oldSnapshot.type) {
					oldSnapshot.type = type;
					return new Promise((resolve, reject) => {
						return snapshot.ref.child(key).set(oldSnapshot)
							.then(r => resolve(true))
							.catch(r => reject());
					});
				}
			}
		}).then((snapshot) => {
			if (snapshot) {
				// Get the new updated votes for this character
				getVotesForCharacterById(request, (data) => {
					// Publish to subscribed `Nes` clients
					server.publish(`/api/v1/vote/${character_id}`, data);
				});
			}
			reply();
		}).catch((err = new Error()) => {
			return reply(boom.wrap(err));
		});
};

// Schema: get
const getVotesForCharacterById = (request, reply) => {
	const { id: character_id } = request.params,
		// Get the user ID from auth object, which is provided by the hapi-auth-basic plugin
		user_id = request.auth.credentials.id;
	db.database()
		.ref('votes/characters')
		.orderByChild('character_id')
		.equalTo(''+character_id)
		.once('value').then(snapshot => {
			let votes = { id: character_id, up: { users: [] }, down: { users:[] } };
			if (snapshot.exists()) {
				const val = snapshot.val();
				let ups = [], downs = [];

				// Calculate how many up/down votes
				Object.keys(val).forEach(key => { 
					if (val[key].type === 'up') {
						ups.push(val[key].user_id)
					}
					else if (val[key].type === 'down') {
						downs.push(val[key].user_id)
					}
				});

				votes.up.users = ups;
				votes.down.users = downs;
			}
			reply(votes);
		}).catch((err = new Error()) => {
			return reply(boom.wrap(err));
		});
};

// Schema: delete
const deleteVoteForCharacterById = (request, reply) => {
	const { id: character_id } = request.params,
		user_id = request.auth.credentials.id;
	db.database()
		.ref('votes/characters')
		.orderByChild('user_id')
		.equalTo(user_id)
		.once('value').then(snapshot => {
			return snapshot.ref
				.orderByChild('character_id')
				.equalTo(character_id)
				.once('value');
		}).then(snapshot => {
			if (snapshot.exists()) {
				let removes = [];
				// Remove all votes (should only be one, but just in case...)
				snapshot.forEach(vote => removes.push(vote.ref.remove()));
				return Promise.all(removes);
			}
		}).then(() => {
			reply();
		}).catch((err = new Error()) => {
			return reply(boom.wrap(err));
		});
};

const schema = {
	// No schema
	delete: false,
	// No schema
	post: false,
	get: joi.object().keys({
		id: joi
			.number()
			.integer()
			.required()
			.description('id of the star wars character')
			.example(4),
		up: joi.object().keys({
			users: joi
				.array()
				.items(
					joi
					.string()
					.description('user ids')
					.example('-u283447589')
				)
		}).label('object_of_users'),
		down: joi.object().keys({
			users: joi
				.array()
				.items(
					joi
					.string()
					.description('user ids')
					.example('-u283447589')
				)
		}).label('object_of_users')
	}).label('votes_container')
};

module.exports = {
	postVoteForCharacterById,
	getVotesForCharacterById,
	deleteVoteForCharacterById,
	schema
};
