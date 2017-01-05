# React / React-Router Server-Side Resolver

Create a server-ready `React.Component` from a normal `React.Component` and a promise-based function. Server will
wait for promise-based function to resolve before responding...

Useful for delaying server responses until async `props` are resolved.


## Example

Create a server-ready route-component derived from any regular component using `wrap`:
```
// my-container.js
import { wrap } from './ss-resolve';
import RegularComponent from './my-components/RegularComponent';
import action from './my-actions/action.js';
import fetchData from './my-services/data.js';

const beforeServerRender = (props, store) => (
	fetchData(props.params)
		.then(data => store.dispatch(action(data)))
);

export wrap(RegularComponent, beforeServerRender);
```

In a server-side route, use `resolve` to trigger those promise-based callbacks:
```
// server.js
import { createStore } from 'redux'
import reducers from '../path/to/reducers';
import { match } from 'react-router';
// ...other stuff found server-side

app.get('*',  (req, res, next) => {

	match({ routes, location: req.url }, (err, redirect, props) => {

		//... handle errors and redirects

		// otherwise:
		const store = createStore(reducers);

		resolve(props, store)
			.then( () => {
				res.send( store.getState() )
			})

	})
});
```
