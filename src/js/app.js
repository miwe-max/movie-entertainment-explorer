import { renderTemplates, renderMedia, populateGenreSelect } from "./ui.mjs";
import { getTrendingMovies, getGenreList, getTrendingTVShows } from "./api.mjs";
import { favoriteButtonListener } from "./events.mjs";


renderTemplates().then(() => {
  getGenreList().then((genres) => {
    populateGenreSelect(genres);
  });
});

getTrendingMovies().then((movies) => {
  renderMedia(document.querySelector("#movies-container"), movies);
});

getTrendingTVShows().then((movies) => {
  renderMedia(document.querySelector("#shows-container"), movies);
  favoriteButtonListener();
});