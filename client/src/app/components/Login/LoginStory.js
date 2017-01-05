import { storiesOf, action } from '@kadira/storybook';
import Login from './Login.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

storiesOf('Login', module)

	.add('default', () => (<MuiThemeProvider>
		<Login />
	</MuiThemeProvider>));
