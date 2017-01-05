import { storiesOf, action } from '@kadira/storybook';
import CharacterCardsList from './CharacterCardsList.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

storiesOf('CharacterCardsList', module)

	.add('default', () => (<MuiThemeProvider>
		<CharacterCardsList 
		/>
	</MuiThemeProvider>));
