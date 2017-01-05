import NotFound from '../components/Error';
import {setHttpResponseCode} from '../actions/system';
import { connect } from 'react-redux';
import {wrap} from '../hocs/ss-resolve';
import { addMeta } from '../hocs/add-meta';

const metaNotFound = addMeta(NotFound);

// on server when mounted, dispatch action which sets status to 404 in store.
export const RouteComponent = wrap(
	metaNotFound,
	(props, store) => Promise.resolve(store.dispatch(setHttpResponseCode(404)))
);

const mergeAllTheProps = (state, actions, own) => ({
	...state, ...actions, ...own,
	title: "Page Not Found",
	subtitle: "Sorry Not Sorry",
	meta: {
		title: "Page Not Found",
		tags: [
			{"name": "description", "content": "This page was not found or an error occured"},
			{"property": "og:type", "content": "article"}
		]
	}
})

export default connect(
	undefined,
	undefined,
	mergeAllTheProps
)(RouteComponent);
