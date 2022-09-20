import "../movie-card";

class MovieList extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({mode: 'open'});
  }

  set movieList(list) {
    this._movieList = list;
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
    :host{
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: center;
    }
    </style>
    `;
    this._movieList.forEach((list) => {
      const movieCard = document.createElement("movie-card");
      movieCard.movies = list;

      this.shadowDOM.appendChild(movieCard);
    });
  }
}
customElements.define("movie-list", MovieList);