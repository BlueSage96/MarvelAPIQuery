import md5 from 'md5';

export const MarvelAPI = async (characterName) => {
    const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);

    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${encodeURIComponent(characterName)}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Marvel API error ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching Marvel data: ', error);
        throw error;
    }
};

//new function to fetch comics
// New function to fetch comics for a character
export const fetchCharacterComics = async (characterId) => {
    const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);

    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?orderBy=onsaleDate&limit=10&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Marvel API error ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching comics data: ', error);
        throw error;
    }
};
export default MarvelAPI;