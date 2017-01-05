import CharacterCardsList from '../CharacterCardsList/CharacterCardsList';

const Home = ({characters = []}) => (
	<section>
		{(characters.length) ? <CharacterCardsList characters={characters}/> : <p>Loading...</p>}
	</section>
);

export default Home;