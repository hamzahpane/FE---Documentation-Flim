import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/Hooks/Hooks"; // Sesuaikan dengan jalur import yang benar
import { Film } from "./redux/Feture/libs/Movie/deffintion";
import { fetchGetFilm } from "./redux/Feture/libs/Movie/MovieListApi";
import { FaStar } from "react-icons/fa"; // Import ikon bintang
import { Link } from "react-router-dom";

const MovieFilm = () => {
  const dispatch = useAppDispatch();
  const { allMovies, loading, error } = useAppSelector(
    (state) => state.movieList
  ); // Mengambil state dari Redux store

  useEffect(() => {
    dispatch(fetchGetFilm()); // Mengambil data film saat komponen dipasang
  }, [dispatch]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Fungsi untuk menghasilkan bintang berdasarkan rating
  const renderStars = (rating: any) => {
    const stars = [];
    const maxStars = 10; // Maksimal 10 bintang

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

  // Filter untuk film dengan rating 7 ke atas
  const filteredMovies = allMovies.filter((movie) => movie.vote_average > 7);

  // Ambil hanya 3 film
  const displayedMovies = filteredMovies.slice(0, 3);

  return (
    <div className=" bg-black">
      <h1 className="text-white mt-10 font-mono font-bold text-2xl mx-8">
        The Best Movies
      </h1>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {displayedMovies.length > 0 ? (
          displayedMovies.map((movie: Film) => (
            <div
              key={movie.id}
              className="relative bg-black rounded-lg overflow-hidden shadow-xl p-2 mx-9"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.original_title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-2">
                <h2 className="text-white font-mono font-bold text-md">
                  {movie.original_title}
                </h2>
                <p className="text-yellow-400 font-mono mt-1 text-sm flex items-center mb-1">
                  Rating: {renderStars(Math.round(movie.vote_average))}
                </p>
                <p className="text-gray-400 text-sm mb-2 font-mono">
                  Release Date: {movie.release_date}
                </p>
                <Link
                  to={`/PageMovie/${movie.id}`}
                  className="border-white bg-gray-700 p-1 rounded-md text-white text-sm text-center font-mono mb-1"
                >
                  Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-300">
            No movies found with rating 7 and above.
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieFilm;
