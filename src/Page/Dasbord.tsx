import Hero from "../Component/Hero";
import MovieFlim from "../Component/BestMovie";
import Navbar from "../Component/Navbar";
import AllMovie from "../Component/AllMovie";
import CastMovie from "../Component/CastMovie";
import Footer from "./Footer";
const Dasbord = () => {
  return (
    <div className="h-screen bg-black">
      <Navbar />

      <div className="mx-5 mt-16" id="Hero">
        <Hero />
      </div>
      <div className="mt-6" id="Movie">
        <MovieFlim />
      </div>
      <div>
        <AllMovie />
      </div>
      <div id="Cast">
        <CastMovie />
      </div>
      <Footer />
    </div>
  );
};

export default Dasbord;
