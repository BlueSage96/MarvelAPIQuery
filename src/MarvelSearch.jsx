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

        try{
            const result = await MarvelAPI(query);
            setCharacters(result.data.results[0] || null);
            //Makes sure we're safely checking if result.data & result.data.results exists
            if(result.data && result.data && result.data.results){
                setCharacters(result.data.results);
                if (result.data.results.length === 0){
                    setError('No character found matching your search.');
                }
            } else {
                //Handle case where the API response doesn't have the expected structure
                setCharacters([]);
                setError('Unexpected API response format.')
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
            <img id="logo" src={marvelLogo} alt="Marvel Logo" />
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
          
            <footer><a href="http://marvel.com\">Data provided by Marvel. © 2025 MARVEL
             </a></footer>
        </div>
    )

}