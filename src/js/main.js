import { renderTemplates, renderMedia } from "./ui.mjs";
import { getTrendingMovies, getTrendingTVShows } from "./api.mjs";
import { favoriteButtonListener } from "./events.mjs";

renderTemplates();

getTrendingMovies().then((movies) => {
  renderMedia(document.querySelector("#movies-container"), movies);
});

getTrendingTVShows().then((movies) => {
  renderMedia(document.querySelector("#shows-container"), movies);
  favoriteButtonListener();
});