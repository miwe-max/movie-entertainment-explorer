const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const TMDB_URL = import.meta.env.VITE_TMDB_URL;


export async function getTrendingMovies() {
   
  const url = `${TMDB_URL}/trending/movie/day?api_key=${TMDB_KEY}`;
  let res = await fetch(url);
  let data = await res.json();
  return data.results;
}

export async function getTrendingTVShows() {
     
    const url = `${TMDB_URL}/trending/tv/day?api_key=${TMDB_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    return data.results;
}

export async function getByIdAndType(type, id) {
   
    let url = ``;
    if (type == "movie"){
        url = `${TMDB_URL}/movie/${id}?api_key=${TMDB_KEY}`;
    } else {
        url = `${TMDB_URL}/tv/${id}?api_key=${TMDB_KEY}`;
    }
    let res = await fetch(url);
    let data = await res.json();
    return data;
}
   
export async function getTrailer(id, type) {
  const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${TMDB_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  // Filter for official YouTube trailer
  const trailer = data.results.find(video =>
    video.type === "Trailer" &&
    video.site === "YouTube"
  );

  if (!trailer) {
    return null; // No trailer found
  }

  return `https://www.youtube.com/watch?v=${trailer.key}`;
}

export async function getGenreList() {
  const movieRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_KEY}&language=en-US`);
  const movieData = await movieRes.json();
  const movieGenres = movieData.genres || [];

  const tvRes = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${TMDB_KEY}&language=en-US`);
  const tvData = await tvRes.json();
  const tvGenres = tvData.genres || [];

  const allGenres = [...movieGenres, ...tvGenres];

  const uniqueGenres = [];
  const seen = new Set();
  for (const genre of allGenres) {
    if (!seen.has(genre.name)) {
      seen.add(genre.name);
      uniqueGenres.push(genre);
    }
  }

  return uniqueGenres;
}

export async function getMedia(type, query) {
   
  const url = `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.results; // <-- list of movies / shows
} 

export async function getMediaByGenre(type, query) {
   
  const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${TMDB_KEY}&with_genres=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results; // <-- list of movies / shows
}

export async function getMediaByGenreAndTitle(type, query1, query2) {
   
  const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${TMDB_KEY}&with_genres=${encodeURIComponent(query2)}&&with_text_query=${encodeURIComponent(query1)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.results; // <-- list of movies / shows
}

export async function getMovieCast(type, movieId) {
    const url = `https://api.themoviedb.org/3/${type}/${movieId}/credits?api_key=${TMDB_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    return data.cast; // <-- actors here
}

export async function getPersonDetails(personId) {
   
    const url = `https://api.themoviedb.org/3/person/${personId}?api_key=${TMDB_KEY}`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
}