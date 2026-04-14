import { getLocalStorage } from "./storage.mjs";
import { loading } from "./animation.mjs";

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
  let date;
  let year;
  if (medias.length != 0) {
    const favorites = getLocalStorage("#favorites") || [];
    medias.forEach(media => {
      let star = "☆";
      let poster = `<img src="https://image.tmdb.org/t/p/w300${media.poster_path}" alt="${media.title || media.name} Poster" />`;
      favorites.forEach(fav =>{
        if (media.id == fav[0]) {
          star = "★";
        }
      })


      if (media.media_type == "tv"|| media.number_of_episodes || media.first_air_date) {
        if (!media.first_air_date) {
          console.log("Date is empty");
        } else {
            date = new Date(media.first_air_date);
        }
      } else if (media.media_type == "movie" || !media.number_of_episodes){
        if (!media.release_date) {
          console.log("Date is empty");
        } else {
          date = new Date(media.release_date);
        }
      
      }

      if (date) {
        year = date.getFullYear();
      } else {
        year = "Year unavailable";
      }

      if (media.name) {
        type = "tv"
      } 
      else if (media.title){
        type = "movie"  
      }   

        mediasHTML += `
      <div id="medias">
        <button id="favorite" data-id="${media.id}" data-type=${type}>${star}</button>
        <button id="poster" data-id="${media.id}" data-type=${type}>
          <h3>${media.title || media.name} (${year})</h3>
          ${poster} 
        </button>
      </div>`
    });
  } else {
    mediasHTML = `<p>Oops, sorry there is no data available</p>`;
  }
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
  let star = "☆";
  const favorites = getLocalStorage("#favorites") || [];
  favorites.forEach(fav =>{
    if (media.id == fav[0]) {
      star = "★";
    }
  })

  console.log(media)
  for (let i = 0; i < media.genres.length; i++) {
    genres.push(media.genres[i].name);
  }
  
  
  if (media.number_of_episodes) {
        type = "tv";
        if (!media.first_air_date) {
          console.log("Date is empty");
        } else {
            date = new Date(media.first_air_date);
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
    }
    
  }

  if (date) {
    year = date.getFullYear();
    date = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  } else {
    year = "Year unavailable";
    date = "Date unavailable"
  }

  
  document.querySelector("title").textContent = `${title || media.name} (${year}) | MTVE`;
  detailsHtml += `
    <div id="movie-details">
      <img src="https://image.tmdb.org/t/p/w300${media.poster_path}" alt="${title || media.name} Poster" />
      <div>
        <h1>${title || media.original_name} (${year})<button id="favorite" data-id="${media.id}" data-type=${type}>${star}</button></h1>
        <h2>Overview</h2>
        
        <p>${media.overview}</p>
        <p>Release Date: ${date}</p>
        <p>Genres: ${genres.join(", ")|| "No genres"}</p>
        <p>popularity: ${parseFloat(media.popularity).toFixed(2)}</p>
        <p>Duration: ${duration}</p>
        <span>Tagline: ${media.tagline || "None"}</span>
      </div>
    </div>
    <div id="trailer"></div>
    <h2>Cast</h2>
    <div id="cast"></div>
  `;
  loading()
  parentElement.innerHTML = detailsHtml;
}

export async function renderCast(parentElement, cast) {
  let view = ``;
  if (cast.length != 0) {
    cast.forEach((member) => {
      let poster = `<img src="https://image.tmdb.org/t/p/w200${member.profile_path}" alt="${member.name || member.original_name} Profile" />`;
      view +=  `<div>
        <button id="profile" data-id="${member.id}">
          ${poster}
        </button>
        <div id="member">
          <p>${member.name}</p>
          <p>Character: ${member.character || "Not provided"}</p>
        </div>
      </div>`;
    })
  } else{
    view = `<p>Oops, cast info is not available</p>`;
  }
  loading()
  parentElement.innerHTML = view;
}

export async function renderPerson(parentElement, person) {
  let detailsHtml = ``;
  let date;
  let year;

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
    <div id="cast-details">
      <img src="https://image.tmdb.org/t/p/w300${person.profile_path}" alt="${person.name} Profile" />
      <div>
        <h1>${person.name}</h1>
        <span>Department: ${person.known_for_department}</span>
        <h2 id="info">Info</h2>
        <p>Birthday: ${date}</p>
        <p>Birth place: ${person.place_of_birth || "Not provided"}</p>
        
        <p>Biography: ${person.biography || "Not provided"}</p>
      </div>
    </div>
  `;
  loading()
  parentElement.innerHTML = detailsHtml
} 

export async function renderActors(parentElement, cast) {
  let view = ``;
  if (cast.length != 0) {
    cast.forEach((member) => {
      let poster = `<img src="https://image.tmdb.org/t/p/w200${member.profile_path}" alt="${member.name || member.original_name} Profile" />`;
      view +=  `<div>
        <button id="profile" data-id="${member.id}">
          ${poster}
        </button>
        <div id="member">
          <p>${member.name}</p>
        </div>
      </div>`;
    })
  } else{
    view = `<p>Oops, cast info is not available</p>`;
  }
  parentElement.innerHTML = view;
}