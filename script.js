const apiKey = "*********************";
const apiAccesToken = "**************************";
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiAccesToken}`
    }
}
const urlBase = 'https://api.themoviedb.org/3/search/movie';
const urlImg = 'https://image.tmdb.org/t/p/w200';

document.getElementById("searchButton").addEventListener("click", searchMovie)

const resultContainer = document.getElementById("results");

function searchMovie() {
    resultContainer.innerHTML = "Loading...";
    let searchInput = document.getElementById("searchInput").value;
    
    fetch(`${urlBase}?query=${searchInput}`, options)
    .then(response => response.json())
    .then(response => displayMovie(response.results))
    .catch(err => console.error(err));
}

function displayMovie(movies) {
    resultContainer.innerHTML = "";

    if (movies.length === 0) {
        resultContainer.innerHTML = "<h2>No results found</h2>";
        return;
    }

    movies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie");
        
        const posterPath = urlImg + movie.poster_path;
        const poster = document.createElement("img");
        poster.src = posterPath;
        poster.alt = movie.title;

        const movieContent = document.createElement("div");
        movieContent.classList.add("movie-content");

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const releaseDate = document.createElement("p");
        releaseDate.textContent = `release date: ${movie.release_date}`;
    
        const overview = document.createElement('p');
        overview.textContent = movie.overview;
        
        movieContent.appendChild(title);
        movieContent.appendChild(releaseDate);
        movieContent.appendChild(overview);
        
        movieContainer.appendChild(poster);
        movieContainer.appendChild(movieContent);

        resultContainer.appendChild(movieContainer);
    })
}
