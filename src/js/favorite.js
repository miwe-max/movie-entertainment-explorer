import { renderTemplates, renderMedia } from "./ui.mjs";
import { getByIdAndType } from "./api.mjs";
import { getLocalStorage } from "./storage.mjs";


let medias = [];
const favorites = getLocalStorage() || [];
favorites.forEach(favorite => {
    const type = favorite[1];
    const id = favorite[0];
    getByIdAndType(type, id).then(media => {medias.push(media)
        renderMedia(document.querySelector("#content-container"), medias);
    });
})


renderTemplates();
