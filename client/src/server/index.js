import 'dotenv/config';
import 'isomorphic-fetch';
import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import {api} from './routes';

// the reactified route-handler from the `app`
import reactHandler from '../app/_server.js';

// create express app...
export const app = express();

const {APP_WEB_BASE_PATH} = process.env;


// middleware
app.use(compression());
app.use(helmet());
app.use(`${APP_WEB_BASE_PATH}/static`, express.static(path.join(__dirname, 'static')));

app.use(`${APP_WEB_BASE_PATH}/api`, api);


// handle routes via react...
app.get("*", reactHandler);


// prepare 404
app.use("*", (req, res, next) => { // eslint-disable-line
    next({status: 404, message: "Not Found"});
});


// handle any errors
app.use( (err, req, res, next) => { // eslint-disable-line
    res.status(err.status||500).send(err.message || "Application Error");
    console.error(err.status===404?`404 ${req.url}`: err.stack); // eslint-disable-line
});

const { PORT } = process.env;

app.listen(PORT, () => console.log('Running on port ' + PORT)); // eslint-disable-line
