/*
Sources: 
How to setup hash & access API
https://www.youtube.com/watch?v=7fbZEfYv6Fs&list=PLaEFB-zhBL5of8Dks-GrZrx7y4gfK6yvX&index=5

w3schools for CSS reference

Search icon image: https://www.iconpacks.net/free-icon/search-2911.html
*/

//wrap data from using it
document.addEventListener('DOMContentLoaded', function() {
    const publicKey = "c10f9e61f8451ba9768a24552c6012fd";
    const ts = "1";
    const hash = "15bb6f3708217a90f9217ef09ef71319";
    const baseURL = "https://gateway.marvel.com/v1/public/characters"; // Ensure this is HTTPS
    const searchButton = document.getElementById("searchButton");
    const charSearch = document.getElementById('characterSearch');
    const result = document.getElementById("result");

    const limit = 12; // Fetch only 12 results at a time
    let debounceTimer;

    var marvel = {
        fetchData: function(name) {
            var url = `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${name}&limit=${limit}`;
            console.log("Fetching data from: ", url);
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        // Handle API errors
                        throw new Error("Failed to fetch data. Status: " + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    result.innerHTML = ''; // Clear previous results
                    if (data.data.results.length > 0) {
                        const character = data.data.results[0];
                        const characterName = character.name;
                        let thumbnail = character.thumbnail.path + '.' + character.thumbnail.extension; // Image URL
                        
                        // Handle stock image if the thumbnail is not available
                        if (character.thumbnail.path.includes('image_not_available')) {
                            thumbnail = 'path/to/stock-image.jpg'; // Use a placeholder stock image path
                        }

                        // Save character data to localStorage
                        localStorage.setItem('characterData', JSON.stringify({
                            name: characterName,
                            thumbnail: thumbnail,
                            comics: character.comics.items // Save comics information
                        }));

                        // Display character name, image, and link to info.html
                        result.innerHTML = `
                            <h2>${characterName}</h2>
                            <br>
                            <a href="info.html">More info about ${characterName}</a>
                            <br>
                            <br>
                            <img src="${thumbnail}" alt="${characterName} image" loading="lazy" />
                            ${character.thumbnail.path.includes('image_not_available') ? '<p>Stock image</p>' : ''}
                        `;
                    } else {
                        result.innerHTML = `<p>No characters found matching "${name}".</p>`;
                    }
                })
                .catch(error => {
                    result.innerHTML = `<p>Error: ${error.message}. Please try again later.</p>`;
                    console.error("Error fetching data: ", error);
                });
        }
    };

    // Event listener for the search button
    searchButton.addEventListener('click', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const character = charSearch.value.trim();
            if (character) {
                marvel.fetchData(character);  // Fetch data based on the entered character name
            } else {
                result.innerHTML = `<p>Please enter a character name.</p>`;
            }
        }, 300); // Debounce time to delay execution
    });
});


function darkMode(){
    var element = document.body;
    element.classList.toggle("dark-mode");
}