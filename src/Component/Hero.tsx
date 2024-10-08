import { fetchGetFilmRandom } from "./redux/Feture/libs/Movie/MovieApi";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/Hooks/Hooks";
import { FaStar } from "react-icons/fa"; // Import ikon bintang

const Hero = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movie.movies);
  const loading = useAppSelector((state) => state.movie.loading);
  const error = useAppSelector((state) => state.movie.error);

  useEffect(() => {
    dispatch(fetchGetFilmRandom());
  }, [dispatch]);

  // Fungsi untuk menghasilkan bintang berdasarkan rating
  const renderStars = (rating: any) => {
    const stars = [];
    const maxStars = 10; // Maksimal 5 bintang

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

  return (
    <div className="justify-center mt-4">
      {loading && <p className="text-white text-center">Loading...</p>}
      {error && <p className="text-white">Error: {error}</p>}

      <div className="flex flex-col items-center justify-center w-full">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative w-full max-w-7xl h-96 overflow-hidden p-2"
          >
            {/* Gambar sebagai latar belakang penuh */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <img
              src={movie.poster_path}
              alt={movie.original_title}
              className="w-full h-full object-cover rounded-md"
            />
            {/* Teks di sebelah kiri */}
            <div className="absolute left-0 top-0 p-2 flex flex-col justify-center bg-transparent w-full sm:w-1/2 h-full mx-2 ">
              <h2 className="text-lg sm:text-xl font-semibold text-white font-mono text-start mb-2">
                {movie.original_title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-mono mb-1">
                Release Date: {movie.release_date}
              </p>

              <div className="flex items-center mb-1">
                {renderStars(Math.round(movie.vote_average))}
              </div>
              <p className="text-xs sm:text-sm text-white font-mono">
                Overview: {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
