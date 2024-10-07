document.addEventListener('DOMContentLoaded', function() {
    const publicKey = "c10f9e61f8451ba9768a24552c6012fd";
    const ts = "1";
    const hash = "15bb6f3708217a90f9217ef09ef71319";
    const comicsList = document.getElementById("comicsList");
    const previousButton = document.getElementById('previousPage');
    
    let currentPage = 0;  // Start at the first page
    const limit = 12;  // Limit to 12 comics per page

    // Fetch character data from localStorage
    const characterData = JSON.parse(localStorage.getItem('characterData'));
    function fetchComics(page) {
        if (characterData) {
            document.getElementById('characterName').innerText = characterData.name;
            
            // Get comics for the current page
            const comics = characterData.comics.slice(page * limit, (page + 1) * limit);
            
            // Clear the previous results
            comicsList.innerHTML = '';
            
            // Loop through the comics array
            comics.forEach((comic, index) => {
                // Replace http with https
                const comicResourceURI = comic.resourceURI.replace('http://', 'https://');
    
                fetch(`${comicResourceURI}?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`API request failed with status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(comicData => {
                        if (comicData && comicData.data && comicData.data.results.length > 0) {
                            const comicDetails = comicData.data.results[0];
                            const comicName = comicDetails.title;
                            let comicThumbnail = `${comicDetails.thumbnail.path}.${comicDetails.thumbnail.extension}`;
                            
                            // Create list item for each comic
                            const listOfComics = document.createElement('li');
                            
                            // Create image element with lazy loading
                            const comicImage = document.createElement('img');
                            comicImage.src = comicThumbnail;
                            comicImage.alt = comicName;
                            comicImage.loading = "lazy"; // Lazy loading
    
                            // Create a paragraph for the comic name
                            const comicTitle = document.createElement('p');
                            comicTitle.innerText = comicName;
                            comicTitle.style.fontSize = "30px";
                            
                            // Check if image is not available, use stock image
                            if (comicThumbnail.includes("image_not_available")) {
                                comicThumbnail = "images/marvel-stock-image.jpg";
                                comicImage.src = comicThumbnail;
                                
                                // Add stock image label
                                const stockImageLabel = document.createElement('p');
                                stockImageLabel.innerText = "Stock image";
                                stockImageLabel.style.color = 'white';
                                stockImageLabel.style.fontSize = "24px";
                                listOfComics.appendChild(stockImageLabel);
                            }
    
                            // Error handling for broken images
                            comicImage.onerror = function() {
                                comicImage.src = "images/marvel-stock-image.jpg";
                                
                                // Add stock image label if fallback triggers
                                const stockImageLabel = document.createElement('p');
                                stockImageLabel.innerText = "Stock image";
                                stockImageLabel.style.color = 'white';
                                stockImageLabel.style.fontSize = "24px";
                                listOfComics.appendChild(stockImageLabel);
                            };
    
                            // Append the image and name to the list item
                            listOfComics.appendChild(comicTitle);
                            listOfComics.appendChild(comicImage);
    
                            // Append the list item to the comics list
                            comicsList.appendChild(listOfComics);
                        } else {
                            console.error("No comic details found in the response");
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching comic details:', error);
                    });
            });
        } else {
            document.body.innerHTML = '<h2>No character information found.</h2>';
        }
    }
    

    // Initial fetch of comics for the first page
    fetchComics(currentPage);
});        

function darkMode(){
    var element = document.body;
    element.classList.toggle("dark-mode");
}