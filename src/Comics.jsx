import "./css/Comics.css";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchCharacterComics } from "./MarvelAPI";


function Comics () {
    const { characterId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Try to get character from locations state or fetch it if needed
    const character = location.state?.character;

    useEffect(() => {
        async function loadComics() {
            if (!characterId) {
                setError("Character ID is missing");
                setLoading(false);
                return;
            }
            try{
                const image = await fetchCharacterComics(characterId);
                setComics(image.data.results || []);
                if (image.data.results.length === 0) {
                    setError("No comics found for this character.");
                }
            } catch (err) {
                setError("Error loading comics: " + err.message);
            } finally {
                setLoading(false);
            }
        }
        loadComics();
    },[characterId])
    
    return (
      <div className="comics-container">
        <div className="comics-top-section">
            <button id="previousButton" onClick={() => navigate(-1)}> &larr; Previous</button>
                 {character && (
            <div className="character-header">
                <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    className="character-header-image" />

                <div className="character-header-info">

                    <h1 id="characterTitle">{character.name}</h1> 

                    {character.description && (
                        <p>{character.description.substring(0, 200)}
                           { character.description.length > 200 ? '...' : ''}
                        </p>
                    )}
                </div>
            </div>
        )}       
        </div>
       
       <div className="comics-content">
            {/* <h2 className="comics-title">Comics</h2> */}
            {loading && (
                        <div className="spinner">
                            <div className="bounce1"/>
                            <div className="bounce2"/>
                            <div className="bounce3"/>
                        </div>
                    )}

                    {error && <div className="error">{error}</div>}

                    {!loading && comics.length > 0 && (
                        <div className="comics-grid">
                            {comics.map(comic => (
                                <div key={comic.id} className="comic-card">
                                    <img
                                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                        alt={comic.title}
                                        className="comic-image"
                                    />

                                    <div className="comic-info">
                                        <h3>{comic.title}</h3>
                                        {comic.description && (
                                            <p className="comic-description">
                                                {comic.description.substring(0,100)}
                                                {comic.description.length > 100 ? '...' : ''}
                                            </p>
                                        )}
                                        <p className="comic-date">
                                            {new Date(comic.modified).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}
       </div>

        
        
        <footer><a href="http://marvel.com\">Data provided by Marvel. © 2025 MARVEL
        </a></footer>
      </div>
    );
}
export default Comics