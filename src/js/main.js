import { renderTemplates, renderMedia } from "./ui.mjs";
import { getTrendingMovies, getTrendingTVShows } from "./api.mjs";
import { favoriteButtonListener } from "./events.mjs";

getTrendingMovies().then(movies => {
    console.log("Trending Movies:", movies);
    renderMedia(document.querySelector("#movies-container"), movies);
});


getTrendingTVShows().then(movies => {
    console.log("Trending TV Shows:", movies);
    renderMedia(document.querySelector("#shows-container"), movies);
    favoriteButtonListener();
});



renderTemplates();

