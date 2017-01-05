/* eslint-disable react/no-multi-comp */
import Loader from './Loader.js';


export const wrapClass = Component => ({onLoad, wait = false, ...props}) => (
	<Loader onLoad={onLoad} wait={wait}>
		<Component {...props} />
	</Loader>
);


export const wrapElement = element => ({onLoad, wait = false}) => (
	<Loader onLoad={onLoad} wait={wait}>{element}</Loader>
);

export {Loader as Component};

export default wrapClass;
