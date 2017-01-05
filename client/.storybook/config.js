import { configure } from '@kadira/storybook';

function loadStories() {
	require('../src/app/components/CharacterCard/CharacterCardStory.js');
	require('../src/app/components/CharacterCardsList/CharacterCardsList.js');
}

configure(loadStories, module);
