import { useAppSelector } from "./redux/Hooks/Hooks"; // Pastikan jalur ini benar
import { FaStar } from "react-icons/fa"; // Import ikon bintang
import { useState } from "react";

const CastMovie = () => {
  // Mengambil semua cast dari Redux store
  const allCast = useAppSelector((state) => state.movieList.allCast);

  // State untuk halaman saat ini
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Jumlah item per halaman

  // Fungsi untuk merender bintang berdasarkan rating
  const renderStars = (rating: number) => {
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

  // Filter cast yang memiliki nilai popularity 7 ke atas
  const filteredCast = allCast.filter((cast) => {
    const popularityNumber = Number(cast.popularity);
    return popularityNumber >= 7; // Memfilter berdasarkan popularity
  });

  const totalPages = Math.ceil(filteredCast.length / itemsPerPage); // Total halaman
  const displayCast = filteredCast.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); // Menampilkan cast berdasarkan halaman

  // Fungsi untuk mengubah halaman
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Fungsi untuk mendapatkan halaman yang akan ditampilkan
  const getDisplayedPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Jika total halaman <= 5, tampilkan semua
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Tambahkan halaman pertama
      pages.push(1);

      // Tambahkan ellipsis jika halaman saat ini lebih dari 3
      if (currentPage > 3) {
        pages.push("...");
      }

      // Tambahkan halaman di sekitar currentPage
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Tambahkan ellipsis jika halaman saat ini kurang dari totalPages - 2
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Tambahkan halaman terakhir
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="bg-black text-white p-4">
      <h1 className="text-xl font-mono mb-4 mx-9">The Best Cast</h1>
      <div className="grid grid-cols-3 gap-2 mt-4 mb-10">
        {displayCast.length > 0 ? (
          displayCast.map((cast) => (
            <div
              key={cast.id}
              className="relative bg-black rounded-lg overflow-hidden shadow-xl p-2 mx-9"
            >
              {cast.profile_path && (
                <div className="flex justify-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                    alt={cast.original_name}
                    className="w-32 h-32 object-cover rounded-full" // Gambar berbentuk bulat
                  />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-2">
                <h2 className="text-white font-mono font-bold text-md">
                  {cast.original_name}
                </h2>
                <p className="text-yellow-400 font-mono mt-1 text-sm flex items-center mb-1">
                  Rating: {renderStars(Math.round(Number(cast.popularity)))}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-300">
            No cast found with popularity 7 and above.
          </div>
        )}
      </div>

      {/* Navigasi Halaman */}
      <div className="flex justify-center mt-8 mb-10">
        {getDisplayedPages().map((page, index) => (
          <button
            key={index}
            onClick={() => {
              if (typeof page === "number") {
                handlePageChange(page);
              }
            }}
            className={`mx-2 px-3 py-1 rounded ${
              currentPage === page ? "bg-yellow-500" : "bg-gray-700"
            }`}
            disabled={typeof page === "string"} // Nonaktifkan tombol jika itu adalah ellipsis
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CastMovie;
