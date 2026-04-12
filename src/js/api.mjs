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