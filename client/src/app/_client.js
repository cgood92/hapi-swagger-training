import { Router, browserHistory } from 'react-router';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import routes from './routes.js';
import getStore from './store.js';

render(
	<Provider store={getStore}>
		<Router history={browserHistory} routes={routes} />
	</Provider>,

	document.getElementById('app')
);
