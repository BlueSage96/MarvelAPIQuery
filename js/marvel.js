/*
Sources: 
How to setup hash & access API
https://www.youtube.com/watch?v=7fbZEfYv6Fs&list=PLaEFB-zhBL5of8Dks-GrZrx7y4gfK6yvX&index=5

w3schools for CSS reference

Search icon image: https://www.iconpacks.net/free-icon/search-2911.html
*/

//wrap data from using it
document.addEventListener('DOMContentLoaded', function() {
    var publicKey = "c10f9e61f8451ba9768a24552c6012fd";
    var baseURL = "http://gateway.marvel.com/v1/public/characters";
    let hash = "15bb6f3708217a90f9217ef09ef71319";
    var searchButton = document.getElementById("searchButton");
    var charSearch = document.getElementById('characterSearch');
    var result = document.getElementById("result");

    const limit = 12; // Fetch only 12 results at a time
    let debounceTimer;

    var marvel = {
        fetchData: function(name) {
            var url = `${baseURL}?ts=1&apikey=${publicKey}&hash=${hash}&nameStartsWith=${name}&limit=${limit}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        // Handle API errors (status codes like 403, 404, etc.)
                        if (response.status === 403) {
                            throw new Error("API rate limit exceeded or access denied.");
                        }
                        if (response.status === 404) {
                            throw new Error("Character not found.");
                        }
                        throw new Error("Something went wrong with the API request.");
                    }
                    return response.json();
                })
                .then(data => {
                    result.innerHTML = ''; // Clear previous results
                    if (data.data.results.length > 0) {
                        // Get the first character result
                        var character = data.data.results[0];
                        var characterName = character.name;
                        var thumbnail = character.thumbnail.path + '.' + character.thumbnail.extension; // Image URL
                        
                        // Handle stock image if the thumbnail is not available
                        if (character.thumbnail.path.includes('image_not_available')) {
                            thumbnail = 'images/marvel-stock-image.jpg';
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
            var character = charSearch.value.trim();
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