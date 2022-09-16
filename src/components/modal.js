class MovieModal extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  // get the movie data from API call
  set movies(value) {
    this._movies = value;
    this.render();
  }

  // show error message
  set renderError(message) {
    this.shadowRoot.innerHTML = `
    <style>
    <style>
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .modal {
      padding: 1.5rem;
      border-radius: 0.5rem;
      background-color: var(--white-col);
      box-shadow: 0 0 0.75rem var(--shadow-col);
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
    }
    .modal-header .title {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      font-size: 1.35rem;
      font-weight: 600;
    }
    .modal-header .title span {
      font-size: 2.1rem;
      font-weight: 400;
    }
    .modal-header .close-btn {
      font-size: 3rem;
      font-weight: 100;
      cursor: pointer;
    }
    .modal-body {
      display: flex;
      gap: 1rem;
      padding: 1rem;
    }
    </style>
    <div class="modal">
      <div class="modal-header">
        <span class="title">
          <span>&lt;</span>
          Movie Detail
        </span>
        <span class="close-btn"> &times; </span>
      </div>
      <div class="modal-body">
        <h1>${message}</h1>
      </div>
    </div>
    `;
  }

  static get observedAttributes() {
    return ["_movies"];
  }


  render() {
    this.shadowRoot.innerHTML = `
    <style>
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .modal {
      padding: 1.5rem;
      border-radius: 0.5rem;
      background-color: var(--white-col);
      box-shadow: 0 0 0.75rem var(--shadow-col);
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
    }
    .modal-header .title {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      font-size: 1.35rem;
      font-weight: 600;
    }
    .modal-header .title span {
      font-size: 2.1rem;
      font-weight: 400;
    }
    .modal-header .close-btn {
      font-size: 3rem;
      font-weight: 100;
      cursor: pointer;
    }
    .modal-body {
      display: flex;
      gap: 1rem;
    }
    .modal-body > div {
      flex-basis: 50%;
      max-width: 300px;
    }
    .modal-body .poster img {
      min-width: 300px;
      border-radius: 0.3rem;
      box-shadow: 0 0 0.5rem var(--shadow-col);
    }
    .desc-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
    }
    .desc-content:nth-child(2) {
      margin-top: 1rem;
    }
    .desc-content:last-child {
      margin-top: 3rem;
    }
    .desc-content:last-child .plot {
      padding: 1rem;
      border-radius: 0.25rem;
      border: 1px solid var(--blue-col);
    }
    .desc-content > h2 {
      font-size: 1.2rem;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .desc-content > span {
      font-size: 0.75rem;
      font-weight: 600;
    }
    .desc-content > span:first-child {
      flex-basis: 30%;
    }
    .desc-content > span:last-child {
      white-space: wrap;
      flex-basis: 50%;
    }
    .desc-content:not(:first-child), .desc-content:not(:last-child){
      margin-bottom: .5rem;
    }
    @media (max-width: 600px) {
      .modal-body {
        flex-direction: column;
      }
    }
    </style>
        <div class="modal">
          <div class="modal-header">
            <span class="title">
              <span>&lt;</span>
              Movie Detail
            </span>
            <span class="close-btn"> &times; </span>
          </div>
          <div class="modal-body">
            <div class="poster">
              <img src="${this._movies.Poster}" alt="poster" />
            </div>
            <div class="desc">
              <div class="desc-content">
                <h2>${this._movies.Title}</h2>
              </div>
              <div class="desc-content">
                <span>Genre :</span>
                <span>${this._movies.Genre}</span>
              </div>
              <div class="desc-content">
                <span>Releashed :</span>
                <span>${this._movies.Released}</span>
              </div>
              <div class="desc-content">
                <span>Actor :</span>
                <span>${this._movies.Actors}</span>
              </div>
              <div class="desc-content">
                <span>Plot :</span>
                <p class="plot">
                  ${this._movies.Plot}
                </p>
              </div>
            </div>
          </div>
          </div>
    `;
      this.shadowDOM.querySelector('.close-btn').addEventListener('click',()=>{
        document.querySelector('modal-container').visibility = false;
      })
  }
}

customElements.define("movie-modal", MovieModal);
