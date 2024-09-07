import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '@services/fetchImages';
import { getImageUrl } from '@helpers/helpers';

import css from './MovieCast.module.css';

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function getMovieCast() {
      try {
        setLoading(true);
        setError(false);
        const { cast } = await fetchMovieCast(movieId);
        if (cast.length === 0) {
          setError(true);
          return;
        }
        setCast(cast);
      } catch (error) {
        console.log(error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovieCast();
  }, [movieId]);

  return (
    <div className={css.castBody}>
      {cast.length !== 0 && (
        <ul className={css.list}>
          {cast.map(({ id, name, profile_path }) => {
            return (
              <li className={css.item} key={id}>
                <div className={css.wrapper}>
                  {profile_path ? (
                    <img
                      className={css.pic}
                      src={getImageUrl(profile_path)}
                      alt={name}
                    />
                  ) : (
                    <p className={css.abbreviation}>{name.slice(0, 1)}</p>
                  )}
                </div>
                <h3 className={css.name}>{name}</h3>
              </li>
            );
          })}
        </ul>
      )}
      {loading && <p>Loading cast...</p>}
      {error && <p>❌ No actors found</p>}
    </div>
  );
}
