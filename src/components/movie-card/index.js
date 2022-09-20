import "./movie-card.css";
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
        <div class="container">
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