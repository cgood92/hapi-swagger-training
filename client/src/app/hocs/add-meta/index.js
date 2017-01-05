import Helmet from 'react-helmet';

export const addMeta = Component => ({ meta: {title, tags}, ...props}) => (
	<div>
		<Helmet title={title} meta={tags} />
		<Component {...props} />
	</div>
);

export default addMeta;
