import { storiesOf, action } from '@kadira/storybook';
import CharacterCard from './CharacterCard.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

storiesOf('CharacterCard', module)

	.add('default', () => (<MuiThemeProvider>
		<CharacterCard 
			name="Jar Jar Binks"
			birth="1990"
			gender="female"
			home="Pluto"
			films="Return of the Jedi"
		/>
	</MuiThemeProvider>));
