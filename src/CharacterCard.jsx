import { useNavigate } from 'react-router-dom';
import "./css/CharacterCard.css";

function CharacterCard({ character }) {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/comics/${character.id}`, { state: { character } });
    };
    
    return (
        <div 
            className="character-card"
            onClick={handleClick}
        >
            <div className="card-image-container">
                <img 
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    className="character-image"
                />
                <div className="card-overlay">
                    <button className="view-comics-btn">View Comics</button>
                </div>
            </div>
            <div className="character-info">
                <h3>{character.name}</h3>
                <div className="character-description-container">
                    <p className="character-description">
                        {character.description 
                            ? character.description.substring(0, 100) + (character.description.length > 100 ? '...' : '')
                            : 'No description available.'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CharacterCard;