import { renderTemplates, renderDetails } from "./ui.mjs";
import { getByIdAndType, getTrailer } from "./api.mjs";
import { favoriteButtonListener } from "./events.mjs";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");

getByIdAndType(type, id).then(media => { renderDetails(document.querySelector("#details-container"), media)
    favoriteButtonListener()
})

const trailerLink = await getTrailer(id, type);
const key = trailerLink.split("v=")[1];

document.getElementById("trailer").innerHTML = `
  <iframe
    src="https://www.youtube.com/embed/${key}"
    frameborder="0" allowfullscreen></iframe>
`;

renderTemplates();