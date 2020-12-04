require("dotenv").config();
const axios = require("axios");
const e = process.env;

// When the #triggenBtn is clicked, get kanye gifs
// show the gifs images in div#gifs_container
// style wise wrap the images
let form = document.getElementById("form");
let theSearchTerm = document.getElementById("search_term");
let gifs;

const debounce = (func, wait, immediate) => {
  let timeout;

  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// have a button appear with the user's input text one second after they've stopped typing
// searchTerm.oninput = debounce(() => {
//   searchTerm = searchTerm.value;
//   form.innerHTML += `<button id="trigger_btn" type="submit">${searchTerm}</button>`;
// }, 1000);

// create a card on form submit, then clear out input values
form.onsubmit = (e) => {
  e.preventDefault();
  if (theSearchTerm.value.trim()) {
    searchTerm = theSearchTerm.value;
    let newCard = document.createElement("div");
    newCard.id = searchTerm;
    newCard.class = "card_div";
    newCard.innerHTML = `<h1>${searchTerm}</h1>
  <button class="movie_button">Movies</button>
  <button class="gif_button">Gifs</button>`;
    document.getElementById("cards_container").appendChild(newCard);
    form.reset();
  }
};

// make a GET request depending on which button is clicked
onclick = (e) => {
  // verify a user has clicked a gif button and make appropriate GET request
  if (e.target.matches("button.gif_button")) {
    searchTerm = e.target.parentNode.id;
    console.log(searchTerm);
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?api_key=${e.GIPHY_API_KEY}&q=${searchTerm}&limit=12`
      )
      .then((res) => {
        // make the data more human readable
        gifs = res.data.data;
        gifs.map((gif) => {
          let url = gif.images.downsized.url;
          let title = gif.title;

          // create a card for each gif
          const gifDiv = document.createElement("div");
          gifDiv.innerHTML = `<h1>${title}</h1>
          <img src="${url}" width="300" alt="${title}">`;
          document.getElementById("gifs_container").appendChild(gifDiv);
        });
      });
  }

  // verify a sure has clicked a movie button and make appropriate GET request
  if (e.target.matches("button.movie_button")) {
    const base_url = "https://image.tmdb.org/t/p/original/";
    searchTerm = e.target.parentNode.id;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=7c04658e5477c9d5adc4bc4359523e75&query=${searchTerm}&limit=12`
      )
      .then((res) => {
        movies = res.data.results;
        // limit calls manually since the API no longer accepts limiting calls
        movies.slice(0, 12).map((movie) => {
          let url = `${base_url}${
            movie.poster_path ? movie.poster_path : movie.backdrop_path
          }`;
          let title = movie.title;

          // create a card for each movie
          const movieDiv = document.createElement("div");
          movieDiv.innerHTML = `<h1>${title}</h1>
          <img src="${url}" width="300" alt="${title}">`;
          document.getElementById("movies_container").appendChild(movieDiv);
        });
      });
  }
};
