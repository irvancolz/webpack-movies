function main(){
    const searchBar = document.querySelector('search-bar');
    const movieList = document.querySelector('movie-list');

    const getMovies = ()=>{
        fetch(`http://www.omdbapi.com/?apikey=8c3a26e3&&s&s=${searchBar.value}`)
        .then(res => res.json())
        .then(res => {
            if(!res.Error){
                movieList.movieList = res.Search
            }else{
                alert(res.Error)
            }
        })
        .catch(err => console.log(err))
    }

    searchBar.clickEvent = getMovies;

}

export default main;