
export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchPopularMovies = async ({ query}: { query: string }) => {
    const endpoint = query 
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const reponse = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    })

    if(!reponse.ok) {
        throw new Error(`Failed to fetch movies: ${reponse.statusText}`);
    }

    const data = await reponse.json();

    return data.results;

}


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