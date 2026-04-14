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

    const searchTemplate = await loadTemplate("../partials/search-bar.html");
    const searchElement = document.querySelector("#search-container");
    renderWithTemplate(searchTemplate, searchElement);

    const footerTemplate = await loadTemplate("../partials/footer.html");
    const footerElement = document.querySelector("#main-footer");
    renderWithTemplate(footerTemplate, footerElement);
}

export async function populateGenreSelect(genres) {
  const select = document.getElementById("genreSelect");

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre.id;     // use ID for API calls
    option.textContent = genre.name;
    select.appendChild(option);
  });
}

export function renderMedia(parentElement, medias) {
  let type = "";
  let mediasHTML = ``;
  
  const favorites = getLocalStorage() || [];
  medias.forEach(media => {
    let star = "☆";
    let poster = `<img src="https://image.tmdb.org/t/p/w300${media.poster_path}" alt="${media.title || media.original_name} Poster" />`;
    favorites.forEach(fav =>{
      if (media.id == fav[0]) {
        star = "★";
      }
    })

    if (media.name) {
      type = "tv"
    } 
    else if (media.title){
      type = "movie"  
    }   

      mediasHTML += `
    <div id="medias">
      <button id="favorite" data-id="${media.id}" data-type=${type}>${star}</button>
      <a href="details.html?id=${media.id}&type=${type}">
        ${poster}
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
  let year;

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
        if (!media.first_air_date) {
          console.log("Date is empty");
        } else {
          if (!media.first_air_date) {
            console.log("Date is empty");
          } else {
            date = new Date(media.first_air_date);
            console.log(date);
          }
          console.log(date);
        }
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
    if (!media.release_date) {
      console.log("Date is empty");
    } else {
      date = new Date(media.release_date);
      console.log(date);
    }
    
  }

  if (date) {
    year = date.getFullYear();
    date = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  } else {
    year = "Year unavailable";
    date = "Date unavailable"
  }

  
  document.querySelector("title").textContent = `${title || media.original_name} (${year}) | MTVE`;
  detailsHtml += `
    <div id="movie-details">
      <img src="https://image.tmdb.org/t/p/w300${media.poster_path}" alt="${title || media.original_name} Poster" />
      <div>
        <h1>${title || media.original_name} (${year})<button id="favorite" data-id="${media.id}" data-type=${type}>${star}</button></h1>
        <p>${date} • ${genres.join(", ")|| "No genres"} • ${duration}</p>
        <h2>Overview</h2>
        <span>${media.tagline}</span>
        <p>${media.overview}</p>
      </div>
    </div>
    <div id="trailer"></div>
    <div id="cast"></div>
  `;
  parentElement.innerHTML = detailsHtml
}

export async function renderCast(parentElement, cast) {
  let view = ``;
  if (cast) {
    cast.forEach((member) => {
      let poster = `<img src="https://image.tmdb.org/t/p/w200${member.profile_path}" alt="${member.name || member.original_name} Profile" />`;
      view +=  `<div>
        <a href="details.html?id=${member.id}">
          ${poster}
        </a>
        <div id="member">
          <p>${member.name}</p>
          <p>Character: ${member.character}</p>
        </div>
      </div>`;
    })
    parentElement.innerHTML = view;
  }
}

export async function renderPerson(parentElement, person) {
  let detailsHtml = ``;
  let date;

  if (!person.birthday) {
    console.log("Date is empty");
  } else {
    date = new Date(person.birthday);
    console.log(date);
  }

  if (date) {
    date = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  } else {
    year = "Year unavailable";
    date = "Date unavailable"
  }

  document.querySelector("title").textContent = `${person.name} | MTVE`;
  detailsHtml += `
    <div id="movie-details">
      <img src="https://image.tmdb.org/t/p/w300${person.profile_path}" alt="${person.name} Profile" />
      <div>
        <h1>${person.name}</h1>
        <p id="birthday">Birthday: ${date}</p>
        <p>Birth place: ${person.place_of_birth}</p>
        <h2>Info</h2>
        <span>Department: ${person.known_for_department}</span>
        <p>Biography: ${person.biography}</p>
      </div>
    </div>
  `;
  parentElement.innerHTML = detailsHtml
} 