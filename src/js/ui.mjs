import { getLocalStorage } from "./storage.mjs";

export async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function renderTemplates() {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const headerElement = document.querySelector("#main-header");
    renderWithTemplate(headerTemplate, headerElement);

    const searchTemplate = await loadTemplate("../partials/search.html");
    const searchElement = document.querySelector("#search-container");
    renderWithTemplate(searchTemplate, searchElement);

    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector("#main-footer");
    renderWithTemplate(footerTemplate, footerElement);
}

export function renderMedia(parentElement, medias) {
  let type = "";
  let mediasHTML = ``;
  
  const favorites = getLocalStorage() || [];
  medias.forEach(media => {
    let star = "☆";
    favorites.forEach(fav =>{
      if (media.id == fav[0]) {
        star = "★";
      }
    })

    if (media.name) {
      type = "tv"
    } 
    if (media.title){
      type = "movie"  
    }   
      mediasHTML += `
    <div id="medias">
      <button id="favorite" data-id="${media.id}" data-type=${type}>${star}</button>
      <a href="details.html?id=${media.id}&type=${type}">
        <img src="https://image.tmdb.org/t/p/w300${media.poster_path}" alt="${media.title} Poster" />
      </a>
    </div>`
  });
  parentElement.innerHTML = mediasHTML;
}

export function renderDetails(parentElement, media){
  let title;
  let date;
  let duration;
  let type;
  let genres = [];  

  let detailsHtml = ``;
  console.log(media)
  let star = "☆";
  const favorites = getLocalStorage() || [];
  favorites.forEach(fav =>{
    if (media.id == fav[0]) {
      star = "★";
    }
  })

  
  for (let i = 0; i < media.genres.length; i++) {
    genres.push(media.genres[i].name);
  }
  
  
  if (media.number_of_episodes) {
        type = "tv";
        date = new Date(media.first_air_date);
        duration = `${media.number_of_seasons} Seasons`;
        title = media.name;
  } else if (!media.number_of_episodes){
    type = "movie";
    title = media.title;
    let minutes = media.runtime;
    let hours = 0;
    while (minutes > 60){
      hours += 1;
      minutes -= 60;
    }
    duration = `${hours}h ${minutes}m`;
    date = new Date(media.release_date);
  }

  
  document.querySelector("title").textContent = `${title} (${date.getFullYear()})`;
  detailsHtml += `
    <div id="movie-details">
      <img src="https://image.tmdb.org/t/p/w300${media.poster_path}" alt="${title} Poster" />
      <div>
        <h1>${title} (${date.getFullYear()})<button id="favorite" data-id="${media.id}" data-type=${type}>${star}</button></h1>
        <p>${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()} • ${genres.join(", ")} • ${duration}</p>
        <h2>Overview</h2>
        <span>${media.tagline}</span>
        <p>${media.overview}</p>
      </div>
    </div>
    <div id="trailer"></div>
  `;
  parentElement.innerHTML = detailsHtml
}