import { renderTemplates, renderMedia, populateGenreSelect } from "./ui.mjs";
import { getTrendingMovies, getGenreList, getTrendingTVShows } from "./api.mjs";
import { favoriteButtonListener, mediaCardListener, searchEvent} from "./events.mjs";
import { getLocalStorage, setLocalStorage } from "./storage.mjs";
import { fadeIn, loading } from "./animation.mjs";

let count = getLocalStorage("#visits") + 1 || 1;
if (count == 1) {
  document.querySelector("#visits").textContent = "Welcome to MTVE!";
} else {
  document.querySelector("#visits").textContent = "Welcome back!";
}

renderTemplates().then(() => {
  getGenreList().then((genres) => {
    populateGenreSelect(genres);
  });
  searchEvent();
});


getTrendingMovies().then((movies) => {
  loading()
  renderMedia(document.querySelector("#movies-container"), movies);
  fadeIn();
});

getTrendingTVShows().then((movies) => {
  renderMedia(document.querySelector("#shows-container"), movies);
  favoriteButtonListener();
  mediaCardListener();
});

setLocalStorage("#visits", count);

 
