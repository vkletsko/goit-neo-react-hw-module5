import axios from 'axios';
import { ACCESS_TOKEN } from '@services/config';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `Bearer ${ACCESS_TOKEN}`;

export async function fetchTrandingMovies() {
  const response = await axios.get('/trending/movie/day');
  return response.data;
}

export async function fetchMoviesByQuery(query = 'batman') {
  const response = await axios.get('/search/movie', { params: { query } });
  return response.data;
}

export async function fetchMovieDetails(movieID = 268) {
  const response = await axios.get(`/movie/${movieID}`);
  return response.data;
}

export async function fetchMovieCast(movieID = 268) {
  const response = await axios.get(`/movie/${movieID}/credits`);
  return response.data;
}

export async function fetchMovieReviews(movieID = 268) {
  const response = await axios.get(`/movie/${movieID}/reviews`);
  return response.data;
}
