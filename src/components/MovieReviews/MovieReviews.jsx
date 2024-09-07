import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '@services/fetchImages';

import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function getMovieReviews() {
      try {
        setLoading(true);
        setError(false);
        const { results } = await fetchMovieReviews(movieId);
        if (results.length === 0) {
          setError(true);
          return;
        }
        setReviews(results);
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieReviews();
  }, [movieId]);

  return (
    <div className={css.reviews}>
      {reviews.length !== 0 &&
        reviews.map(({ id, author, content }) => (
          <article className={css.feedback} key={id}>
            <h3 className={css.author}>{author.slice(0, 1)}</h3>
            <p className={css.text}>{content}</p>
          </article>
        ))}
      {loading && <p>Loading reviews...</p>}
      {error && <p>No reviews found</p>}
    </div>
  );
}
