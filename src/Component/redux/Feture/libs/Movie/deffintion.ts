export type GetRandomFilm = {
  id: string; // Menggunakan string karena id dalam API adalah string
  movie_id: number;
  original_title: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string; // Menggunakan string untuk tanggal
  vote_average: number;
  vote_count: number;
  adult: boolean;
  created_at: string | null; // Mungkin null
  updated_at: string | null; // Mungkin null
};

export type Cast = {
  id: string;
  movie_id: number;
  name: string;
  original_name: string;
  popularity: string;
  profile_path: string;
  character: string;
  created_at: null | string;
  updated_at: null | string;
};

export type Film = {
  id: string;
  movie_id: number;
  original_title: string;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  created_at: null | string;
  updated_at: null | string;
  casts: Cast[];
};

export type GetAllFilm = {
  data: Film[];
};
