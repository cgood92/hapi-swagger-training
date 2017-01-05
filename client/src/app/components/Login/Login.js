import styles from './Login.css';
import classes from 'join-classnames';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import {fullWhite} from 'material-ui/styles/colors';

export default (props) => {
	const { handlers, status } = props;

	let statusMessage = null, loading = false;
	if (status === 'badAttempt') {
		statusMessage = 'Login attempt was not successful';
	}
	if (status === 'loading') {
		loading = true;
	}

	return (<Paper zDepth={5} circle={true} className={styles.paper}>
		<form onSubmit={handlers.submit} className={styles.form}>
			<h1>Login</h1>
			<TextField hintText="Username" type="text" name="username" disabled={loading} />
			<TextField hintText="Password" type="password" name="password" disabled={loading} />
			<RaisedButton label="Sign in" className={styles.submitButton} type="submit" disabled={loading} />
			{ statusMessage && <Snackbar
				open={true}
				message='Please try again'
				action={statusMessage}
				autoHideDuration={4000}
			/> }
		</form>
	</Paper>);
};

