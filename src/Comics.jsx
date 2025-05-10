import "./css/Comics.css"
import { useLocation, useNavigate } from 'react-router-dom';

function Comics () {
    const location = useLocation();
    const navigate = useNavigate();
    const character = location.state?.character;

    if (!character) {
        return <div>No character data available</div>
    }
    
    return (
        <>
        <button id="previousButton" onClick={() => navigate(-1)}>Previous</button>
        <h1 id="characterTitle">{character.name}</h1>
        <div id="comics">
            <ol id="comicsList"></ol>
        </div>
        <footer><a href="http://marvel.com\">Data provided by Marvel. © 2025 MARVEL
        </a></footer>
        </>
    )
}
export default Comics