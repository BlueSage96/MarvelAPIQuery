import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/CharacterCard.css";

function CharacterCard({ character }){
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        navigate(`/comics/${character.id}`, { state: { character }});
    };

    return (
        <div  
            className={`character-card4{isHovered ? 'hovered' : ''}`}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img 
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="character-image"
            />
            <div className="character-info">
                <h3>{character.name}</h3>
                {isHovered && character.description && (
                    <p className="character-description">{character.description}</p>
                )}
                {isHovered && !character.description && (
                    <p className="character-description">No description available</p>
                )}
                {isHovered && (
                   <button className="view-comics-btn">View Comics</button> 
                )}
            </div>
        </div>
    );
}
export default CharacterCard;