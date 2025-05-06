import { useState } from 'react';
import "./css/MarvelSearch.css"
import MarvelAPI from "./MarvelAPI";
import marvelLogo from './assets/marvel-logo.jpg';

export default function MarvelSearch() {
    const [query, setQuery] = useState('');
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);

        try{
            const image = await MarvelAPI(query);
            setCharacter(image.data.results[0] || null);
        } catch (err) {
            setError('Error fetching character data: ', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div id="MarvelSearch">
            <h1 id="title"> Marvel Character Search </h1>

            <div className="searchForm">
                <input type="text" id="characterName" 
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter character name" required />

                <button type="button" id="searchButton"
                onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}</button>
            </div>
            <div id="spinner" style={{display: 'none'}}>
                <img src="assets/spinner.gif" alt="loading" style={{width: '50px'}}/>
            </div>

            { error && <div className="error">{error}</div>}

            { character && (
                <div className="character">
                    <h2>{character.name}</h2>
                    <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`}/>
                    alt={character.name}
                    <p>{character.description || "No description available. "}</p>
                </div>
            )}
            <img id="logo" src={marvelLogo} alt="Marvel Logo" />
            <footer><a href="http://marvel.com\">Data provided by Marvel. © 2025 MARVEL
             </a></footer>
        </div>
    )

}