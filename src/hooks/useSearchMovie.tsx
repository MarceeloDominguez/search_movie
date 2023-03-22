import {useState, useEffect} from 'react';
import {Movie} from '../interfaces/movieInterfaces';

const APIKEY = '59fac2f751f32b407b1ccad78a44e44b';

export const useSearchMovie = (textValue: string) => {
  const [movieResults, setMovieResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const getMovies = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=es-ES&page=1&query=${textValue}`,
      );
      const resp = await data.json();

      setMovieResults(resp.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [textValue]);

  return {movieResults, loading};
};
