export default function(props, store) {

	const promises = (props.components||[])
		// unwrap component if wrapped by react-redux bindings...
		.map(component => component.WrappedComponent || component)

		// grab only components with a static `load` method
		.filter(component => component.onServer)

		// execute onServer functions -- they should return a Promise
		.map(component => component.onServer(props, store));

	return Promise.all(promises);
}
