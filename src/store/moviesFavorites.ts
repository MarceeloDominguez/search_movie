import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

type State = {
  movieFavorite: number[];
};

type Action = {
  addMovieFavorite: (id: number) => void;
  removeMovieFavorite: (id: number) => void;
};

export const useFavoriteMovie = create(
  persist<State & Action>(
    set => ({
      movieFavorite: [],

      addMovieFavorite: (id: number) =>
        set(state => ({movieFavorite: [...state.movieFavorite, id]})),

      removeMovieFavorite: (id: number) =>
        set(state => ({
          movieFavorite: state.movieFavorite.filter(item => item !== id),
        })),
    }),
    {name: 'list-movie', storage: createJSONStorage(() => AsyncStorage)},
  ),
);
