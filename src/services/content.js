export const img = 'https://image.tmdb.org/t/p/';

export const AuthStr = sessionStorage.getItem('Authorization');

export const userId = sessionStorage.getItem('userId') || false;


export const url = (
  id,
  query = 'a',
  page = '1',
  adult = 'false',
  langue = 'en-US'
) => {
  return {
    query_movie: `https://api.themoviedb.org/3/search/movie` +
      `?api_key=18cb3ed1e51594213b505970b2c9a0bf&langue=${langue}` +
      `&query=${query}&page=${page}&include_adult=${adult}`,

    id_movie: `https://api.themoviedb.org/3/movie/${id}` +
      `?api_key=18cb3ed1e51594213b505970b2c9a0bf&langue=${langue}`,

    query_tv: `https://api.themoviedb.org/3/search/tv` +
      `?api_key=18cb3ed1e51594213b505970b2c9a0bf&langue=${langue}` +
      `&query=${query}&page=${page}`,

    id_tv: `https://api.themoviedb.org/3/tv/${id}` +
      `?api_key=18cb3ed1e51594213b505970b2c9a0bf&langue=${langue}`,
  };
};

export const urlApi = (id = '') => {
  return {
    movie: `http://localhost:8085/api/watchlist-mv/${id}`,
    tv: `http://localhost:8085/api/watchlist-tv/${id}`,
    user: `http://localhost:8085/auth/update/${id}`,
  };
};
