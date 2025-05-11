import { useState } from 'react';
import "./css/MarvelSearch.css"
import MarvelAPI from "./MarvelAPI";
import CharacterCard from "./CharacterCard";
import marvelLogo from './assets/marvel-logo.jpg';

export default function MarvelSearch() {
    const [query, setQuery] = useState('');
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        setCharacters([]); //clear previous results

        try{
            const result = await MarvelAPI(query);
            //filter out characters with placeholder images
            const filteredCharacters = result.data.results.filter(character => 
                character.thumbnail &&
                !character.thumbnail.path.includes('image_not_available') &&
                !character.thumbnail.path.includes('4c002e0305708')
            );

            setCharacters(filteredCharacters);

            if (filteredCharacters.length === 0) {
                setError('No characters found matching your search.');
            }
            
        } catch (err) {
            console.error('Error fetching data:', err);
            setCharacters([]); //Reset to empty array on error
            setError('Error fetching character data: ', err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div id="MarvelSearch">
            <h1 id="title"> Marvel Character Search </h1>

            <div className="searchForm">
                <input type="text" id="characterName" 
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter character name" required />

                <button type="button" id="searchButton"
                onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}</button>
            </div>
             {loading && (
                <div className="spinner">
                    <div className="bounce1"/>
                    <div className="bounce2"/>
                    <div className="bounce3"/>
                </div>
             )}
            
            { error && <div className="error">{error}</div>}

             {/* Ensures that characters exists  & is an array before trying to access
                 its length property */}
            {characters && characters.length > 0 && (
                <div className="character-grid">
                    {characters.map(character => (
                        <CharacterCard key={character.id} character={character}/>
                    ))}
                </div>
            )}
             <img id="logo" src={marvelLogo} alt="Marvel Logo" />
            <footer><a href="http://marvel.com\">Data provided by Marvel. © 2025
             </a></footer>
        </div>
    )

}