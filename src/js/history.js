import {
  renderTemplates,
  renderMedia,
  populateGenreSelect,
  renderActors,
} from "./ui.mjs";
import { getByIdAndType, getGenreList, getPersonDetails } from "./api.mjs";
import { getLocalStorage } from "./storage.mjs";
import {
  mediaCardListener,
  searchEvent,
  castCardListener,
  favoriteButtonListener,
} from "./events.mjs";
import { fadeIn, loading } from "./animation.mjs";

renderTemplates().then(() => {
  getGenreList().then((genres) => {
    populateGenreSelect(genres);
  });
  searchEvent();
});

let medias = [];
const media_history = getLocalStorage("#recent") || [];
if (media_history.length != 0) {
  media_history.forEach((history) => {
    const type = history[1];
    const id = history[0];
    getByIdAndType(type, id).then((media) => {
      loading();
      medias.push(media);
      renderMedia(document.querySelector("#content-container"), medias);
      favoriteButtonListener();
      mediaCardListener();
      fadeIn();
    });
  });
} else {
  loading();
  document.querySelector("#content-container").innerHTML =
    `<p>No history is available</p> `;
  fadeIn();
}

let actors = [];
const actor_history = getLocalStorage("#cast") || [];
if (actor_history.length != 0) {
  actor_history.forEach((history) => {
    const id = history;
    getPersonDetails(id).then((person) => {
      actors.push(person);
      renderActors(document.querySelector("#cast"), actors);
      castCardListener();
    });
  });
} else {
  loading();
  document.querySelector("#cast").innerHTML = `<p>No history is available</p> `;
  fadeIn();
}
