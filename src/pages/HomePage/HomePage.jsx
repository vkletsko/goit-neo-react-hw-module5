import { useEffect, useState } from 'react';
import { MovieList } from '@components';
import { fetchTrandingMovies } from '@services/fetchImages';

import css from './HomePage.module.css';

export default function HomePage() {
  const [trandingMovies, setTrandingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function uploadTrandingMovies() {
      try {
        setLoading(true);
        const { results } = await fetchTrandingMovies();
        if (results.length === 0) {
          throw new Error('Service unavailable');
        }

        setTrandingMovies(results);
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    uploadTrandingMovies();
  }, []);

  return (
    <>
      <main className={css.main}>
        <h1>Tranding today</h1>

        {trandingMovies && <MovieList movies={trandingMovies} />}
        {loading && <p>Loading movies...</p>}
        {error && <p>Error occurs</p>}
      </main>
    </>
  );
}
