import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/Hooks/Hooks";
import { fetchGetFilm } from "./redux/Feture/libs/Movie/MovieListApi";
import { FaStar } from "react-icons/fa"; // Import ikon bintang
import { Link } from "react-router-dom";

const AllMovie = () => {
  const dispatch = useAppDispatch();
  const { allMovies, loading, error, searchQuery } = useAppSelector(
    (state) => state.movieList
  );
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8; // Jumlah film per halaman

  useEffect(() => {
    dispatch(fetchGetFilm());
  }, [dispatch]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Filter movies berdasarkan searchQuery
  const filteredMovies = allMovies.filter((movie) =>
    movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

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

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-black text-white p-4">
      <h1 className="text-xl font-mono mb-4 mx-9 mt-10">All Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-black rounded-lg overflow-hidden shadow-xl p-2 mx-9"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
              className="w-full h-56 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2">
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
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-2 px-3 py-1 rounded ${
              currentPage === index + 1 ? "bg-yellow-500" : "bg-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllMovie;
