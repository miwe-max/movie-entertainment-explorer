import { renderTemplates, renderMedia, populateGenreSelect } from "./ui.mjs";
import {
  getMedia,
  getGenreList,
  getMediaByGenre,
  getMediaByGenreAndTitle,
  getTrendingMovies,
  getTrendingTVShows,
} from "./api.mjs";
import { favoriteButtonListener, mediaCardListener, searchEvent } from "./events.mjs";
import { fadeIn, loading } from "./animation.mjs";

renderTemplates().then(() => {
  getGenreList().then((genres) => {
    populateGenreSelect(genres);
  });
  searchEvent();
});

const params = new URLSearchParams(window.location.search);

const query1 = params.get("search");
const query2 = params.get("genre")


if (query1 && !query2) {
  getMedia("movie", query1).then((medias) => {
    loading();
    renderMedia(document.querySelector("#movies-container"), medias);
    fadeIn();
  });

  getMedia("tv", query1).then((medias) => {
    renderMedia(document.querySelector("#shows-container"), medias);
    favoriteButtonListener();
    mediaCardListener();
  });
} else if (!query1 && query2) {
  getMediaByGenre("movie", query2).then((medias) => {
    loading();
    renderMedia(document.querySelector("#movies-container"), medias);
    fadeIn();
  });

  getMediaByGenre("tv", query2).then((medias) => {
    renderMedia(document.querySelector("#shows-container"), medias);
    favoriteButtonListener();
    mediaCardListener();
  });
} else if (query1 && query2) {
  getMediaByGenreAndTitle("movie", query1, query2).then((medias) => {
    loading();
    renderMedia(document.querySelector("#movies-container"), medias);
    fadeIn();
  });

  getMediaByGenreAndTitle("tv", query2).then((medias) => {
    renderMedia(document.querySelector("#shows-container"), medias);
    favoriteButtonListener();
    mediaCardListener();
  });
} else {
  getTrendingMovies().then((movies) => {
    loading();
    renderMedia(document.querySelector("#movies-container"), movies);
    fadeIn();
  });

  getTrendingTVShows().then((movies) => {
    renderMedia(document.querySelector("#shows-container"), movies);
    favoriteButtonListener();
    mediaCardListener();
  });
}

 