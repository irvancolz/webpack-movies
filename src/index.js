import axios from "axios";

const main = () => {
  const searchBar = document.querySelector("search-bar");
  const movieList = document.querySelector("movie-list");

  const getMovies = () => {
    axios
      .get(`http://www.omdbapi.com/?apikey=8c3a26e3&&s&s=${searchBar.value}`)
      .then((res) => {
        if (!res.data.Error) {
          movieList.movieList = res.data.Search;
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  searchBar.clickEvent = getMovies;
};

export default main;
