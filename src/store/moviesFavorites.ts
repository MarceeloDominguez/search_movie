import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {Movie} from '../interfaces/movieInterfaces';

type State = {
  movieFavorite: Movie[];
  ids: number[];
};

type Action = {
  addIdMovieFavorite: (id: number) => void;
  removeIdMovieFavorite: (id: number) => void;

  addMovieFavorite: (movie: Movie) => void;
  removeMovieFavorite: (movie: Movie) => void;
};

export const useFavoriteMovie = create(
  persist<State & Action>(
    set => ({
      movieFavorite: [],
      ids: [],

      addIdMovieFavorite: (id: number) =>
        set(state => ({
          ids: [...state.ids, id],
        })),

      removeIdMovieFavorite: (id: number) =>
        set(state => ({ids: state.ids.filter(item => item !== id)})),

      addMovieFavorite: (movie: Movie) =>
        set(state => ({movieFavorite: [...state.movieFavorite, movie]})),

      removeMovieFavorite: (movie: Movie) =>
        set(state => ({
          movieFavorite: state.movieFavorite.filter(item => item !== movie),
        })),
    }),
    {name: 'list-movie', storage: createJSONStorage(() => AsyncStorage)},
  ),
);
