import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieList } from '@components';
import { fetchMoviesByQuery } from '@services/fetchImages';

import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchMovie, setSearchMovie] = useState([]);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams('');
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (query.trim() === '') return;

    async function getMoviesByQuery() {
      try {
        setError(false);
        const { results } = await fetchMoviesByQuery(query);
        if (results.length === 0) {
          setSearchParams({ query: '' });
          throw new Error('❌ Service unavailable');
        }

        setSearchMovie(results);
      } catch (error) {
        console.log(error.message);
        setError(true);
      }
    }
    getMoviesByQuery();
  }, [query, setSearchParams]);

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    setSearchParams({ query: form.elements.query.value });
    form.reset();
  };

  return (
    <main className={css.main}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          className={css.searchField}
          type="search"
          name="query"
          placeholder="Find movie..."
        />
        <button type="submit">Search</button>
      </form>
      {searchMovie.length !== 0 && <MovieList movies={searchMovie} />}
      {error && <p className={css.error}>❌ No movies found</p>}
    </main>
  );
}
