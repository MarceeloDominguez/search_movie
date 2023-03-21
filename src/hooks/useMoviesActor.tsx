import React, {useState, useEffect} from 'react';
import {ActorMovie} from '../interfaces/movieActor';

const APIKEY = '59fac2f751f32b407b1ccad78a44e44b';

export const useMoviesActor = (id: number) => {
  const [movieActor, setMovieActor] = useState<ActorMovie[]>([]);
  const [loading, setLoading] = useState(false);

  const getMovies = async () => {
    setLoading(true);
    try {
      const movies = await fetch(
        `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${APIKEY}&language=es-ES`,
      );
      const resp = await movies.json();
      setMovieActor(resp.cast);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {movieActor, loading};
};
