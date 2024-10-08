import { configureStore } from "@reduxjs/toolkit";
import { MovieReducer } from "./libs/Movie/MovieApi";
import { movieListReducer } from "./libs/Movie/MovieListApi";

export const store = configureStore({
  reducer: {
    movie: MovieReducer,
    movieList: movieListReducer,
  },
});

export type RooteState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
