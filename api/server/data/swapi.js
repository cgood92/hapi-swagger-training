'use strict';

var request = require('request'),
	// For some basic caching
	memoize = require('memoizee'),
	boom = require('boom');

// Build an URL for SWAPI with queries and params passed in
const _buildUrl = (path, param, query) => {
	let base = `http://swapi.co/api/${path}/`;
	if (param) {
		base += `${param}/`;
	}
	if (query) {
		const string = Object.keys(query).map((key) => `${key}=${query[key]}`);
		base += '?' + string.join('&');
	}
	return base;
};

// Fetch the URL, parse it as JSON
const get = (url) => {
	return new Promise((resolve, reject) => {
		request(url, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				return resolve(JSON.parse(body));
			} else {
				console.error(`API call to '${response.request.href}' was not successful`);
				return reject(boom.create(response.statusCode));
			}
		});
	});
};

// Cache controller - memoize the get
const cache = memoize(get);

const _getPageNum = (length, page, limit) => {
	if (page < 1) {
		page = 1;
	} 

	const target = ((page - 1)*limit);

	if (target > length) {
		target = length - limit;
	}

	return target;
};

const _sort = (key) => {
	return (a,b) => {
		// Sort by the key specified (unless that key doesn't exist, in which case sort by name)
		const aVal = a[key] || a.name,
			bVal = b[key] || b.name;
		if (aVal < bVal) {
			return -1;
		} else if (aVal > bVal) {
			return 1;
		} else {
			return 0;
		}
	};
};

/*
	Keep fetching more results until the limit has been reached.  Doing this method does NOT mean that, when returning the sorted array, the sorted array is comprehensive of all results.  It simply means that we found X number of people, and then sorted those X number of people by the sort.  So, if you sort by "name", then not all "A" names will be on the first page, unless your limit >= total.  In short, we are slicing and then sorting, whereas a true "Google" like experience would be sort then slice.  But, this is a quick/lean method.
*/
const _continueToFetch = function _continueToFetch(endpoint, userPage, limit, sort, total, page, resolve) {
	cache(_buildUrl(endpoint, null, { page })).then((data) => {
		const concated = total.concat(data.results),
			totalLength = concated.length;
		if (totalLength < (limit*userPage) && data.next) {
			_continueToFetch(endpoint, userPage, limit, sort, concated, page+1, resolve);
		} else {
			const startingIndex = _getPageNum(totalLength, userPage, limit);
			const results = concated.slice(startingIndex, startingIndex+limit).sort(_sort(sort));
			// Due to memoizee "cache", we need to resolve a clean copy of the data, so that the original doesn't get affected
			return resolve(JSON.parse(JSON.stringify(results)));
		}
	});
};

// Get a character from SWAPI
const character = (name) => {
	return new Promise((resolve, reject) => {
		cache(_buildUrl('people', null, { search: name })).then((data) => {
			if (data.results.length) {
				// Due to memoizee "cache", we need to resolve a clean copy of the data, so that the original doesn't get affected
				return resolve(JSON.parse(JSON.stringify(data)));
			} else {
				// Not found
				return reject(boom.create(404));
			}
		}).catch((err) => reject(err));
	});
};

/* 
	Why put limit + sort here, instead of in the transform?  Because these params
	deal with querying the data, not on presenting it.  If this was a DB query in the
	api, then we would have that logic here...
*/
const characters = (page = 1, limit = 10, sort = "name") => {
	return new Promise((resolve, reject) => {
		_continueToFetch('people', page, limit, sort, [], 1, resolve);
	});
};

const residents = () => {
	return new Promise((resolve, reject) => {
		_continueToFetch('planets', 1, 1000, 'name', [], 1, resolve);
	});
};

module.exports = {
	character,
	characters,
	residents,
	url: get
};
