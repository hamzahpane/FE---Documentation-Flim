import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Component/redux/Hooks/Hooks";
import {
  selectMovie,
  clearSelectedMovie,
} from "../Component/redux/Feture/libs/Movie/MovieListApi";
import { FaStar } from "react-icons/fa"; // Import ikon bintang
import { HiArrowNarrowLeft } from "react-icons/hi";
const Details = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const dispatch = useAppDispatch();
  const allMovies = useAppSelector((state) => state.movieList.allMovies); // Ambil allMovies dari store
  const selectedMovie = useAppSelector(
    (state) => state.movieList.selectedMovie
  );

  const renderStars = (rating: any) => {
    const stars = [];
    const maxStars = 10;

    for (let i = 0; i < maxStars; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-400"}
        />
      );
    }
    return stars;
  };

  useEffect(() => {
    // Mencari film berdasarkan ID dari allMovies
    const movie = allMovies.find((movie) => movie.id === id);
    if (movie) {
      dispatch(selectMovie(movie)); // Dispatch action untuk memilih film
    }

    return () => {
      dispatch(clearSelectedMovie()); // Bersihkan saat komponen tidak lagi digunakan
    };
  }, [id, dispatch, allMovies]); // Tambahkan allMovies ke dependency array

  if (!selectedMovie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-black text-white p-4">
      <div className="flex">
        {" "}
        <NavLink to="/Dasbord">
          {" "}
          <h1 className="flex items-center gap-2 text-xl font-mono">
            {" "}
            <HiArrowNarrowLeft /> Back To Movie{" "}
          </h1>
        </NavLink>
      </div>
      <div className="flex p-4 mt-2">
        <div className="w-1/2 bg-black mx-2">
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
            alt={selectedMovie.original_title}
            className="w-full h-50 object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2 mx-2">
          <h1 className="text-2xl font-mono mb-4">
            {selectedMovie.original_title}
          </h1>
          <p className="text-base font-mono">{selectedMovie.overview}</p>
          <p className="mt-2 font-mono">
            <strong>Release Date:</strong> {selectedMovie.release_date}
          </p>
          <p className="mt-2 flex items-center font-mono">
            Rating:{" "}
            <p className="ml-1 flex">
              {" "}
              {renderStars(Math.round(selectedMovie.vote_average))}
            </p>
          </p>
        </div>
      </div>

      <div className="mt-4 p-3">
        <h2 className="font-bold text-center mb-4 font-mono">Cast Movie:</h2>
        <div className="flex justify-center flex-wrap">
          {selectedMovie.casts.map((cast) => (
            <div
              key={cast.id}
              className="text-center justify-center items-center p-4 mx-4 mb-4"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={cast.name}
                className="w-20 h-20 object-cover rounded-full border-2 border-gray-400"
              />
              <p className="text-gray-400 text-sm text-center">{cast.name}</p>
              <p className="text-gray-500 text-sm">as {cast.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
