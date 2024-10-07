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
    var baseURL = "https://gateway.marvel.com/v1/public/characters"; // Updated to HTTPS
    var searchButton = document.getElementById("searchButton");
    var charSearch = document.getElementById('characterSearch');
    var result = document.getElementById("result");

    const limit = 12; // Fetch only 12 results at a time
    let debounceTimer;

    var marvel = {
        fetchData: function(name) {
            var url = `${baseURL}?ts=1&apikey=${publicKey}&hash=15bb6f3708217a90f9217ef09ef71319&nameStartsWith=${name}&limit=${limit}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch data.");
                    }
                    return response.json();
                })
                .then(data => {
                    result.innerHTML = ''; // Clear previous results
                    if (data.data.results.length > 0) {
                        var character = data.data.results[0];
                        var characterName = character.name;
                        var thumbnail = character.thumbnail.path + '.' + character.thumbnail.extension; // Image URL
                        
                        if (character.thumbnail.path.includes('image_not_available')) {
                            thumbnail = 'path/to/stock-image.jpg';
                        }

                        localStorage.setItem('characterData', JSON.stringify({
                            name: characterName,
                            thumbnail: thumbnail,
                            comics: character.comics.items // Save comics information
                        }));

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

    searchButton.addEventListener('click', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            var character = charSearch.value.trim();
            if (character) {
                marvel.fetchData(character);
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