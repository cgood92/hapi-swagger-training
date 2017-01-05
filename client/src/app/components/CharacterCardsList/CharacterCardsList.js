import styles from './CharacterCardsList.css';
import classes from 'join-classnames';
import gridlayout from '../../../../node_modules/gridlayout/gridlayout.min.css';

import CharacterCard from '../../containers/CharacterCard';

export default ({ characters = [] }) => {
	return (
		<ul className={classes(styles.list, gridlayout['gl'])}>{
			characters.map((character,i) => {
			return (<li key={i} className={classes(styles.item, gridlayout['gl-cell'], gridlayout['gl-sm-12'], gridlayout['gl-md-6'], gridlayout['gl-lg-4'])}><CharacterCard {...character}/></li>);
			})
		}</ul>
	);
};
