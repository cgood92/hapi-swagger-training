'use strict';

/* Why have these functions here, if they just return the raw data?  
   In case one day they would want to change something, such as swapping out URLs
   for the data they would contain, etc.
*/
const user = (user = {}) => {
	return new Promise((resolve, reject) => {
		const { id, scope } = user;
		resolve({
			id,
			scope
		});
	});
};

module.exports = {
	user	
};
