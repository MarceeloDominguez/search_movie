import React, {useState, useEffect} from 'react';
import {Cast} from '../interfaces/castInterface';
import {MovieFull} from '../interfaces/movieFullInterface';

const APIKEY = '59fac2f751f32b407b1ccad78a44e44b';

interface MovieDetails {
  movieFull: MovieFull | undefined;
  cast: Cast[];
}

export const useDetailsMovie = (idMovie: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieFull, setMovieFull] = useState<MovieDetails>({
    movieFull: undefined,
    cast: [],
  });

  const getDetailsMovie = async () => {
    const dataMovieDetail = await fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}?api_key=${APIKEY}&language=es-ES`,
    );
    const respMovieDetail = await dataMovieDetail.json();

    const dataCast = await fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}/credits?api_key=${APIKEY}&language=es-ES`,
    );
    const respMovieCast = await dataCast.json();

    await Promise.all([respMovieDetail, respMovieCast]);

    setMovieFull({
      movieFull: respMovieDetail,
      cast: respMovieCast.cast,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getDetailsMovie();
  }, [idMovie]);

  return {...movieFull, isLoading};
};
