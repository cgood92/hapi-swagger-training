const path = require('path');

const whitelistresolver = (path, ignore, depth) => {

	// safeguard to avoid a forever crawl
	const maxDepth = depth || 40;

	// create an ignore filter. Provided an array, it will return a function
	// that checks if an item is in that array.
	// useful with [].filter
	const createIgnoreFilter = (exclusions) => (item) => exclusions.indexOf(item)===-1;

	// remove duplicates from array
	const isUnique = (item, i, arr) => arr.indexOf(item)===i;

	// flatten array deeply
	const flatten = (l, c) => l.concat(Array.isArray(c) ? flatten(c) : c);

	// flatten, remove falsey values, remove duplicates
	const normalizeArray = (arr) => (arr||[])
		.reduce(flatten, [])
		.filter(x=>x)
		.filter(isUnique);

	const packages = Object.keys(require(path).dependencies)
		.filter( createIgnoreFilter(normalizeArray(ignore)) );


	// grab the denormalized list of child deps (may be nested with dupes)
	const uncleanChildren = (
		packages.map(d => Object.keys(require(`${d}/package.json`).dependencies))
	);

	// create a new ignore list from parent
	const childIgnoreList = normalizeArray( [].concat(ignore).concat(packages));

	// flatten, remove dupes and falseys, and remove items that appear in new
	// ignore list.
	const childDeps = normalizeArray(uncleanChildren)
		.filter( createIgnoreFilter(childIgnoreList));


	var descendents = [];
	if(maxDepth>0) {
		// create a new ignore list from original ignore items, root packages and child packages
		const deepIgnoreList = normalizeArray([]
			.concat(ignore)
			.concat(packages)
			.concat(childDeps)
		);

		// recursive crawl all childrens deps ignore anything that was already found
		// or is on the original ignore list.
		// return a denormalized list of deps
		const uncleanDescendents = childDeps
			.map(desc => whitelistresolver(`${desc}/package.json`, deepIgnoreList, maxDepth-1));

		// flatten, dedupe and remove falseys then remove previously found items or things in original ignore list.
		descendents = normalizeArray(uncleanDescendents)
			.filter(createIgnoreFilter(deepIgnoreList));
	}


	return normalizeArray([]
		.concat(packages)
		.concat(childDeps)
		.concat(descendents)
	);


}


module.exports = (ignore) => {

	const whitelist = whitelistresolver('../package.json', ignore || ['react']);

	// ignore all packages in node_modules, except for things in the whitelist
	return whitelist.length
		? new RegExp(`node_modules.(?!${whitelist.join("|")})`)
		: path.resolve('node_modules/');

}
