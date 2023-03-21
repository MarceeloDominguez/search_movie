export interface MoviesActor {
  cast: ActorMovie[];
  crew: Crew[];
  id: number;
}

export interface ActorMovie {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order?: number;
  media_type: MediaType;
  origin_country?: string[];
  original_name?: string;
  first_air_date?: string;
  name?: string;
  episode_count?: number;
}

export enum MediaType {
  Movie = 'movie',
  Tv = 'tv',
}

export enum OriginalLanguage {
  Bg = 'bg',
  De = 'de',
  En = 'en',
  Fr = 'fr',
  It = 'it',
  Sr = 'sr',
}

export interface Crew {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: null | string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  media_type: MediaType;
}
