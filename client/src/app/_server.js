import React from 'react';
import docTemplate from './HTML.js';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import routes from './routes.js';
import getStore from './store.js';
import { minify } from 'html-minifier';
import { resolve } from './hocs/ss-resolve';
import {selectHTTPResponseCode} from './store.js';

import * as env from './env.js';


export default (req, res, next) => {
	match({ routes, location: req.url }, (err, redirect, props) => {

		if (err) {
			return next(err);

		} else if (redirect) {
			res.redirect(redirect.pathname + redirect.search)

		} else if (props) {
			const store = getStore;

			resolve(props, store)
				.then(() => {
					const initialState = store.getState();
					const httpStatus = selectHTTPResponseCode(initialState);

					const content = renderToString(
						<Provider store={store}>
							<RouterContext {...props} />
						</Provider>
					);

					res.status(httpStatus).send(
						minify(
							docTemplate({
								...(Helmet.rewind()),
								content,
								initialState,
								env,
								base_path: env.APP_WEB_BASE_PATH
							}),
							{ collapseWhitespace: true, removeAttributeQuotes: true }
						)
					);
				}).catch(next);

		} else {
			res.status(404).send('Not Found')
		}
	})
}
