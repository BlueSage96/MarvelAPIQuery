import "./css/Comics.css"
import MarvelSearch from './MarvelSearch.jsx';

function Comics () {
    return (
        <>
        <button id="previousButton" onClick="history.back()">Previous</button>
        <h1 id="characterTitle">{MarvelSearch.character.name}</h1>
        <div id="comics">
            <ol id="comicsList"></ol>
        </div>
        <footer><a href="http://marvel.com\">Data provided by Marvel. © 2025 MARVEL
        </a></footer>
        </>
    )
}
export default Comics