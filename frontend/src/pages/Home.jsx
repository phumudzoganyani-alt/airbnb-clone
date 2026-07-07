import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Listings from "./Listings";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <Listings />
      <Footer />
    </>
  );
}

export default Home;