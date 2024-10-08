import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllFilm, Film, Cast } from "./deffintion"; // Perbaiki jalur import
import axios from "axios";

// Asynchronous thunk untuk mengambil semua film
export const fetchGetFilm = createAsyncThunk<GetAllFilm>(
  "Movie/fetchGetFilm",
  async () => {
    const response = await axios.get("https://jsonfakery.com/movies/paginated");
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "listMovie",
  initialState: {
    allMovies: [] as Film[],
    selectedMovie: null as Film | null,
    allCast: [] as Cast[],
    loading: false,
    error: null as string | null,
    searchQuery: "", // Tambahkan state ini
  },
  reducers: {
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Set query pencarian
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetFilm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetFilm.fulfilled, (state, action) => {
        state.loading = false;
        state.allMovies = action.payload.data;
        state.allCast = action.payload.data.flatMap((movie) => movie.casts);
      })
      .addCase(fetchGetFilm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching all film data";
      });
  },
});

// Ekspor actions
export const { selectMovie, clearSelectedMovie, setSearchQuery } =
  movieSlice.actions;
export const movieListReducer = movieSlice.reducer;
