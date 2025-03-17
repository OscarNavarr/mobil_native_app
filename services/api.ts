
export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchPopularMovies = async ({ query }: { query: string }) => {
    if (!TMDB_CONFIG.API_KEY) {
      console.error("Error: API Key is missing.");
      return [];
    }
  
    const endpoint = query 
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Fetched movies:", data.results); // 🟢 Verifica los datos obtenidos
      return data.results || []; // ✅ Retorna un array vacío si no hay resultados
    } catch (error) {
      console.error("Error fetching movies:", error);
      return []; // ✅ Evita que retorne `null` o valores inesperados
    }
  };


/*
    const url = 'https://api.themoviedb.org/3/authentication';
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWRlOWU2MWRjZmJkYzU5OGZmMjg5Y2RlNTkyYTBiOCIsIm5iZiI6MTc0MTk0OTEzNi4zNDgsInN1YiI6IjY3ZDQwOGQwNTA2Y2M5MGQ2NDAyNzk1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PeqEp3uddEW6pswW0OxnQdPwJPG8BTdqhxtZPF8rSJs'
    }
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
*/