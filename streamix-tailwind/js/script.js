

// MOVIES


const movies = [
    {
        id: 1,
        title: "Jackie Chan",
        image: "assets/images/image1.jpg",
        genre: "Action",
        year: 2026,
        rating: "8.4",
        trailer: "4O03AGaqTsE"
    },

    {
        id: 2,
        title: "Mafia",
        image: "assets/images/image2.jpg",
        genre: "Drama",
        year: 2025,
        rating: "7.9",
        trailer: "o74uJ3JIL8o"
    },

    {
        id: 3,
        title: "They came without warning",
        image: "assets/images/image3.jpg",
        genre: "Sci-Fi",
        year: 2026,
        rating: "8.1",
        trailer: "WbV4bE75FbM"
    },

    {
        id: 4,
        title: "Gangster's Baby",
        image: "assets/images/image4.jpg",
        genre: "Comedy",
        year: 2024,
        rating: "7.6",
        trailer: "cDYicbmUxhg"
    },

    {
        id: 5,
        title: "Decommissioned",
        image: "assets/images/image5.jpg",
        genre: "Thriller",
        year: 2025,
        rating: "8.0",
        trailer: "ul93J0A9RV0"
    }
];
console.log("script loaded:", movies.length);



// CREATE MOVIE CARD


function createMovieCard(movie) {

    const card = document.createElement("div");

    card.className =
        "group relative h-[270px] w-[180px] flex-shrink-0 cursor-pointer overflow-hidden rounded-md transition duration-300 hover:scale-105";

    card.innerHTML = `
        <img
            src="${movie.image}"
            alt="${movie.title}"
            class="h-full w-full object-cover"
        >

        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-10 opacity-0 transition duration-300 group-hover:opacity-100">

            <h3 class="text-sm font-bold">
                ${movie.title}
            </h3>

            <p class="text-xs text-gray-300">
                ${movie.year} • ${movie.genre} • ⭐ ${movie.rating}
            </p>

        </div>
    `;

    card.addEventListener("click", function () {
        window.location.href = `movie.html?id=${movie.id}`;
    });

    return card;
}



// DISPLAY MOVIES

function displayMovies(containerId, movieList) {

    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.innerHTML = "";

    movieList.forEach(function (movie) {

        const card = createMovieCard(movie);

        container.appendChild(card);

    });
}


displayMovies("trendingMovies", movies);
displayMovies("popularMovies", movies);
displayMovies("actionMovies", movies);



// SEARCH


const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchTerm = searchInput.value.toLowerCase();

        const filteredMovies = movies.filter(function (movie) {

            return movie.title.toLowerCase().includes(searchTerm);

        });

        displayMovies("trendingMovies", filteredMovies);
        displayMovies("popularMovies", filteredMovies);
        displayMovies("actionMovies", filteredMovies);

    });

}



// MOVIE DETAILS PAGE


const movieImage = document.getElementById("movieImage");

if (movieImage) {

    const params = new URLSearchParams(window.location.search);

    const movieId = Number(params.get("id"));

    const movie = movies.find(function (movie) {

        return movie.id === movieId;

    });


    if (movie) {

        document.getElementById("movieImage").src = movie.image;

        document.getElementById("movieImage").alt = movie.title;

        document.getElementById("movieTitle").textContent = movie.title;

        document.getElementById("movieMeta").textContent =
            `${movie.year} • ${movie.genre} • ⭐ ${movie.rating}`;

        document.getElementById("movieDescription").textContent =
            `Watch ${movie.title}, a ${movie.genre.toLowerCase()} movie available on Streamix.`;


        const trailerBtn = document.getElementById("trailerBtn");

        const trailerContainer =
            document.getElementById("trailerContainer");

        const trailerFrame =
            document.getElementById("trailerFrame");


        trailerBtn.addEventListener("click", function () {

            trailerFrame.src =
                `https://www.youtube.com/embed/${movie.trailer}`;

            trailerContainer.style.display = "block";

            trailerBtn.style.display = "none";

        });

    }

}