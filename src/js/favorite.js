import { renderTemplates, renderMedia, populateGenreSelect } from "./ui.mjs";
import { getByIdAndType, getGenreList } from "./api.mjs";
import { getLocalStorage } from "./storage.mjs";
import { mediaCardListener, searchEvent } from "./events.mjs";
import { fadeIn, loading } from "./animation.mjs";

renderTemplates().then(() => {
  getGenreList().then((genres) => {
    populateGenreSelect(genres);
  });
  searchEvent();
});

let medias = [];
const favorites = getLocalStorage("#favorites") || [];
favorites.forEach((favorite) => {
  const type = favorite[1];
  const id = favorite[0];
  getByIdAndType(type, id).then((media) => {
    loading();
    medias.push(media);
    renderMedia(document.querySelector("#content-container"), medias);
    mediaCardListener();
    fadeIn();
  });
});

 