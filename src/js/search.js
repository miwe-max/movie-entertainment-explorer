import { renderTemplates, renderMedia, populateGenreSelect } from "./ui.mjs";
import {
  getMedia,
  getGenreList,
  getMediaByGenre,
  getMediaByGenreAndTitle,
  getTrendingMovies,
  getTrendingTVShows,
} from "./api.mjs";
import { favoriteButtonListener } from "./events.mjs";
import '../css/style.css';

renderTemplates().then(() => {
  getGenreList().then((genres) => {
    populateGenreSelect(genres);
  });
});

const params = new URLSearchParams(window.location.search);

const query1 = params.get("search");
const query2 = params.get("genre");

if (query1 && !query2) {
  getMedia("movie", query1).then((medias) => {
    renderMedia(document.querySelector("#movies-container"), medias);
    console.log(medias);
  });

  getMedia("tv", query1).then((medias) => {
    renderMedia(document.querySelector("#shows-container"), medias);
    favoriteButtonListener();
    console.log(medias);
  });
} else if (!query1 && query2) {
  getMediaByGenre("movie", query2).then((medias) => {
    renderMedia(document.querySelector("#movies-container"), medias);
    console.log(medias);
  });

  getMediaByGenre("tv", query2).then((medias) => {
    renderMedia(document.querySelector("#shows-container"), medias);
    favoriteButtonListener();
    console.log(medias);
  });
} else if (query1 && query2) {
  getMediaByGenreAndTitle("movie", query2).then((medias) => {
    renderMedia(document.querySelector("#movies-container"), medias);
    console.log(medias);
  });

  getMediaByGenreAndTitle("tv", query2).then((medias) => {
    renderMedia(document.querySelector("#shows-container"), medias);
    favoriteButtonListener();
    console.log(medias);
  });
} else {
  getTrendingMovies().then((movies) => {
    renderMedia(document.querySelector("#movies-container"), movies);
  });

  getTrendingTVShows().then((movies) => {
    renderMedia(document.querySelector("#shows-container"), movies);
    favoriteButtonListener();
  });
}