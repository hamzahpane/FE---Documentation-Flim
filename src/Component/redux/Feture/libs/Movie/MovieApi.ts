import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetRandomFilm } from "./deffintion"; // Pastikan nama import sesuai
import axios from "axios";

// Asynchronous thunk untuk mengambil data film acak
export const fetchGetFilmRandom = createAsyncThunk<GetRandomFilm[]>(
  "Movie/fetchGetFilmRandom",
  async () => {
    const response = await axios.get("https://jsonfakery.com/movies/random");
    return [response.data]; // Kembalikan data sebagai array
  }
);

// Slice untuk mengelola state film
const movieSlice = createSlice({
  name: "Movie",
  initialState: {
    movies: [] as GetRandomFilm[], // Array untuk menyimpan data film acak
    loading: false, // Status loading
    error: null as string | null, // Menyimpan error jika ada
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetching film acak
    builder
      .addCase(fetchGetFilmRandom.pending, (state) => {
        state.loading = true; // Mengatur loading menjadi true saat fetching dimulai
        state.error = null; // Reset error
      })
      .addCase(fetchGetFilmRandom.fulfilled, (state, action) => {
        state.loading = false; // Mengatur loading menjadi false saat fetching selesai
        state.movies = action.payload; // Menyimpan data film acak ke state
      })
      .addCase(fetchGetFilmRandom.rejected, (state, action) => {
        state.loading = false; // Mengatur loading menjadi false saat fetching gagal
        state.error = action.error.message || "Error fetching random film data"; // Menyimpan pesan error
      });
    // Handle fetching semua film
  },
});

// Ekspor reducer untuk digunakan di store
export const MovieReducer = movieSlice.reducer;
