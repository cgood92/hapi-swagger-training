// quickly turn HTML strings into a wrapped JSX component.
// useful for when getting html strings from endpoint

export const htmlToJsx = (__html) => (
	<div dangerouslySetInnerHTML={{__html}} /> // eslint-disable-line
);

export default htmlToJsx;
