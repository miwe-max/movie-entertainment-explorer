import { renderTemplates, renderMedia, populateGenreSelect } from "./ui.mjs";
import { getByIdAndType, getGenreList } from "./api.mjs";
import { getLocalStorage } from "./storage.mjs";
import "../css/style.css";

renderTemplates().then(() => {
  getGenreList().then((genres) => {
    populateGenreSelect(genres);
  });
});

let medias = [];
const favorites = getLocalStorage() || [];
favorites.forEach((favorite) => {
  const type = favorite[1];
  const id = favorite[0];
  getByIdAndType(type, id).then((media) => {
    medias.push(media);
    renderMedia(document.querySelector("#content-container"), medias);
  });
});