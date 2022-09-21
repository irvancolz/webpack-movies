import axios from "axios";
import VanillaTilt from "vanilla-tilt";

class MovieCard extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }
  set movies(data) {
    this._movies = data;
    this.render();
  }

  render() {
    const modalContainer = document.querySelector("modal-container");

    function getMovies(id) {
      axios
        .get(`http://www.omdbapi.com/?apikey=8c3a26e3&&s&i=${id}`)
        .then((res) => {
          if (res.status != 200) {
            alert("movie not available");
          } else {
            modalContainer.movies = res.data;
            modalContainer.visibility = true;
          }
        })
        .catch((err) => console.log(err));
    }
    this.shadowDOM.innerHTML = `
        <style>
        *{
            margin: 0;
            padding:0;
            box-sizing: border-box;
        }
        :host{
            cursor: pointer;
            padding: .5rem;
            border-radius: .3rem;
            background-color: var(--white-col);
            box-shadow: 0 0 .75rem var(--shadow-col);
        }
        .poster{
            max-width: 200px;
            aspect-ratio: 33/45;
            border-radius: .2rem;
        }
        .title{
            width: 100%;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .container{
            transform-style: preserve-3d;
        }
        
        @media(max-width: 600px){
            .movie-card {
                flex-basis: 45%;
              }
              .movie-card .poster,
              .movie-card .title {
                max-width: 150px;
              }
              .movie-card .title {
                font-size: 1rem;
              }
        }
        </style>
        <div class="container">
          <img src="${this._movies.Poster}" alt="${this._movies.Title}" class="poster" />
          <h3 class="title">${this._movies.Title}</h3>
        </div>
        `;
    // get movie data from API
    this.shadowDOM.querySelector(".poster").addEventListener("click", () => {
      getMovies(this._movies.imdbID);
    });

    // tilt js
    VanillaTilt.init(this.shadowRoot.querySelector(".container"), {
      reverse: true,
      scale: 1.1,
    });
  }
}

customElements.define("movie-card", MovieCard);
