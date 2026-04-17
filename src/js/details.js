import {
  renderTemplates,
  renderDetails,
  renderCast,
  renderPerson,
  populateGenreSelect,
} from "./ui.mjs";
import {
  getByIdAndType,
  getTrailer,
  getMovieCast,
  getPersonDetails,
  getGenreList,
} from "./api.mjs";
import {
  favoriteButtonListener,
  autoplayListener,
  searchEvent,
  castCardListener,
} from "./events.mjs";
import { getLocalStorage, setLocalStorage } from "./storage.mjs";
import { slideIn, loading } from "./animation.mjs";

renderTemplates().then(() => {
  getGenreList().then((genres) => {
    populateGenreSelect(genres);
  });
  searchEvent();
});

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

if (type) {
  getByIdAndType(type, id).then(async (media) => {
    loading();
    slideIn();
    renderDetails(document.querySelector("#details-container"), media);
    favoriteButtonListener();

    const trailerLink = await getTrailer(id, type);
    if (trailerLink) {
      const key = trailerLink.split("v=")[1];
      document.getElementById("trailer").innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${key}?enablejsapi=1&mute=1"
          frameborder="0" allowfullscreen></iframe>
      `;
    } else {
      document.getElementById("trailer").classList.add("visible");
      document.getElementById("trailer").innerHTML =
        `<p>Oops, sorry there is no trailer available</p>`;
    }

    autoplayListener();

    getMovieCast(type, id).then((cast) => {
      renderCast(document.getElementById("cast"), cast);
      castCardListener();
    });

    let viewed = getLocalStorage("#recent") || [];
    viewed = viewed.filter((item) => item[0] !== id);
    viewed.unshift([id, type]);
    viewed = viewed.slice(0, 10);
    setLocalStorage("#recent", viewed);
  });
} else {
  getPersonDetails(id).then((person) => {
    loading();
    renderPerson(document.querySelector("#details-container"), person);
    let cast = getLocalStorage("#cast") || [];
    if (cast.includes(id)) {
      console.log("Already added.");
    } else {
      cast.unshift(id);
      cast = cast.slice(0, 10);
    }
    slideIn();
    setLocalStorage("#cast", cast);
  });
}
