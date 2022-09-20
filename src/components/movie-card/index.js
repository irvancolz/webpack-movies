class MovieCard extends HTMLElement {
    constructor(){
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }
    set movies(data){
        this._movies = data;
        this.render();
    }

    render(){
        const modalContainer = document.querySelector('modal-container');

        function getMovies(id){
            fetch(`http://www.omdbapi.com/?apikey=8c3a26e3&&s&i=${id}`)
            .then(res => res.json())
            .then(res => {
                if(res.Response ='true'){
                    modalContainer.movies = res;
                }else{
                    alert('movie is not available')
                }
            })
            .catch(err => console.log(err))
        }
        this.shadowDOM.innerHTML =`
        <style>
        *{
            margin: 0;
            padding:0;
            box-sizing: border-box;
        }
        .poster{
            max-width: 200px;
            border-radius: .2rem;
            transition: filter .2s ease-in-out;
        }
        .title{
            width: 100%;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        :host{
            cursor: pointer;
            padding: .5rem;
            border-radius: .3rem;
            background-color: var(--white-col);
            box-shadow: 0 0 .75rem var(--shadow-col);
        }
        .movie-card:hover .poster{
            filter: brightness(.8);
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

        <div class="movie-card">
          <img src="${this._movies.Poster}" alt="${this._movies.Title}" class="poster" />
          <h3 class="title">${this._movies.Title}</h3>
        </div>
        `
        this.shadowDOM.querySelector('.poster').addEventListener('click',()=>{
            getMovies(this._movies.imdbID)
            modalContainer.visibility = true;
        })
    }
}

customElements.define('movie-card', MovieCard);