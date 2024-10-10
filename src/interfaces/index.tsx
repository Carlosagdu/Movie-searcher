export interface MoviesDataType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  media_type: string;
  release_date: string;
  title: string;
  first_air_date: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface creditType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department?: string;
  job?: string;
  character?: string;
  order?: number;
}
