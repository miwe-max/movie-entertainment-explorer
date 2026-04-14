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
import { favoriteButtonListener } from "./events.mjs";
import "../css/style.css";

renderTemplates().then(() => {
  getGenreList().then((genres) => {
    populateGenreSelect(genres);
  });
});

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

if (type) {
  getByIdAndType(type, id).then(async (media) => {
    renderDetails(document.querySelector("#details-container"), media);
    favoriteButtonListener();

    const trailerLink = await getTrailer(id, type);
    if (trailerLink) {
      const key = trailerLink.split("v=")[1];
      document.getElementById("trailer").innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${key}?autoplay=1"
          frameborder="0" allowfullscreen></iframe>
      `;
    } else {
      document.getElementById("trailer").innerHTML =
        `<p>Oops, sorry there is no trailer available</p>`;
    }

    getMovieCast(type, id).then((cast) => {
      renderCast(document.getElementById("cast"), cast);
    });
  });
} else {
  getPersonDetails(id).then((person) => {
    renderPerson(document.querySelector("#details-container"), person);
  });
}