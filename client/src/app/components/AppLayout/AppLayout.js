import 'normalize.css';
import styles from './style.css';

import SiteHeader from '../SiteHeader/SiteHeader.js';
import Login from '../../containers/login';

// Material-UI stuff
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default ({homelink, children, isLoggedIn, handlers = {} }) => (

	<MuiThemeProvider>
		<div className={styles.app}>

			<SiteHeader className={styles.header} homelink={homelink} isLoggedIn={isLoggedIn} handlers={{logout: handlers.logout}} />

			<div className={styles.wrapper}>
				<main className={styles.main}>{(isLoggedIn) ? children : <Login/>}</main>
			</div>
		</div>
	</MuiThemeProvider>
);
