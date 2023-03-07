import {useState, useEffect} from 'react';
import {Movie} from '../interfaces/movieInterfaces';

const APIKEY = '59fac2f751f32b407b1ccad78a44e44b';

export const useSearchMovie = (textValue: string) => {
  const [movieResults, setMovieResults] = useState<Movie[]>([]);

  const getMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=es-ES&page=1&query=${textValue}`,
    );
    const resp = await data.json();

    setMovieResults(resp.results);
  };

  useEffect(() => {
    getMovies();
  }, [textValue]);

  return {movieResults};
};
