import {useEffect, useState} from 'react';
import {Movie} from '../interfaces/movieInterfaces';

const APIKEY = '59fac2f751f32b407b1ccad78a44e44b';

interface MoviesState {
  nowPlaying: Movie[];
  upcoming: Movie[];
  topRated: Movie[];
  popular: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<MoviesState>({
    nowPlaying: [],
    upcoming: [],
    topRated: [],
    popular: [],
  });

  const getMovies = async () => {
    const dataNowPlaying = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=es-ES`,
    );
    const respNowPlaying = await dataNowPlaying.json();

    const dataUpcoming = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=es-ES`,
    );
    const respUpcoming = await dataUpcoming.json();

    const dataTopRated = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=es-ES`,
    );
    const respTopRated = await dataTopRated.json();

    const dataPopular = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES`,
    );
    const respPopular = await dataPopular.json();

    const resp = await Promise.all([
      respNowPlaying,
      respUpcoming,
      respTopRated,
      respPopular,
    ]);

    setMovies({
      nowPlaying: resp[0].results,
      upcoming: resp[1].results,
      topRated: resp[2].results,
      popular: resp[3].results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {...movies, isLoading};
};
