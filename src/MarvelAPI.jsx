import md5 from 'md5';

export const MarvelAPI = async (characterName) => {
    const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);

    //handles pagination and gets more results
    const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${encodeURIComponent(characterName)}&limit=50&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

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

// New function to fetch comics for a character
export const fetchCharacterComics = async (characterId) => {
    const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
    const ts = new Date().getTime().toString();
    const hash = md5(ts + privateKey + publicKey);

     // Increased limit to get more results, then we'll filter and take the first 8
    const url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?orderBy=-onsaleDate&limit=25&format=comic&formatType=comic&noVariants=true&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Marvel API error ${response.status}`);
        }

        const info = await response.json();

        //filter out comics with placeholder images
        const filteredComics = info.data.results.filter(comic =>
            comic.thumbnail &&
            !comic.thumbnail.path.includes('image_not_available') && 
            !comic.thumbnail.path.includes('4c002e0305708')
        );

        // limit to 8 comics after filtering
        info.data.results = filteredComics.slice(0,8);

        return info;

    } catch (error) {
        console.error('Error fetching comics data: ', error);
        throw error;
    }
};
export default MarvelAPI;