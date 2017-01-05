import React from 'react';


/*
a higher order function which wraps React Components with a Higher-Order Components
that contain on onServer static method. Method can then be called on ServerSide.

wrapClass :: ( ComponentA, beforeServerRender ) -> ComponentB
	where
		ComponentA :: React.Component
		beforeServerRender :: (props, store) -> Promise
		ComponentB :: React.Component
*/


export default (Component, beforeServerRender = ()=>{}) => {

	return React.createClass({ // eslint-disable-line
		statics: {
			onServer: function(props, store) {
				return beforeServerRender ? beforeServerRender(props, store) : null;
			}
		},

		render: function() {
			return <Component {...this.props} />
		}
	});
};
