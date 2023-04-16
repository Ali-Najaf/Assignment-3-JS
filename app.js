(async function(){
const response=await fetch("./data.json")
const movies = await response.json()

const butnEl=document.getElementById("search_Btn")
const inputEl=document.getElementById("input")
const listEl=document.getElementById("movielist")
const containerEl=document.getElementById("movieDetails")
const mostWatchedEl=document.getElementsByClassName("most_watched")
const mostRecentEl=document.getElementsByClassName("most_recent")
const mostPopularEl=document.getElementsByClassName("most_popular")

function search() {
    const value = inputEl.value.toLowerCase();
    const result = movies.filter(function(movies) {
      let genresString = "";
      if (typeof movies.genres === "string") {
        genresString = movies.genres.toLowerCase();
      } else if (Array.isArray(movies.genres)) {
        genresString = movies.genres.join(" ").toLowerCase();
      }

      return (
        movies.title.toLowerCase().includes(value) ||
        movies.original_language.toLowerCase().includes(value) ||
        genresString.includes(value) ||
        movies.tagline.toLowerCase().includes(value) ||
        movies.overview.toLowerCase().includes(value)
      );
      
    });
    displaySearchResult(result);
    console.log(result);
  }
  
butnEl.addEventListener("click",search)
function displaySearchResult(result){
    listEl.innerHTML=""
    result.forEach(function(movies){
        const li=document.createElement("li")
        const ListItem=`
        <h2 className="title">${movies.title}</h2>
        <div className="description">${movies.genres}</div>
        <div className="description"><b>Languages: </b>${movies.original_language}</div>
        <div className="description"><b>Cast: </b>${movies.cast.map(actor => actor.name)          
            .join(", ")}</div>
            <div className="description"><b>Release Date: </b>${movies.release_date}</div>
        `

        li.innerHTML=ListItem
        li.addEventListener("click", function () {
            loadmoviesDetails(movies);
        });
        listEl.appendChild(li)
    })
}
function loadmoviesDetails(movies) {
    containerEl.innerHTML = `
        <h2 class="title">${movies.title}</h2>
        <h3>Genres:</h3>
        <ul>${movies.genres.map(function (ingredient) {
          return "<li>" + ingredient + "</li>"
        }).join("")}</ul>
        <h3>Overview:</h3>
        <div>${movies.overview}</div>
        <h3>Run Time:</h3>
        <div>${movies.runtime}</div>
        <h3>Budget:</h3>
        <div>${movies.budget} $</div>
        <h3>Revenue:</h3>
        <div>${movies.revenue} $</div>
        <h3>Rating:</h3>
        <div>${movies.vote_average} </div>
        <h3>Popularity:</h3>
        <div>${movies.popularity} </div>
        <h3>Directors:</h3>
        <div className="description">${movies.directors.map(directors => directors.name)          
            .join(", ")}</div>
        <h3>Writers:</h3>
        <div className="description">${movies.writers.map(directors => directors.name)          
            .join(", ")}</div>
    `;
  }
  for (let i = 0; i < mostRecentEl.length; i++) {
    mostRecentEl[i].addEventListener("click", function() {
      // Add code to handle most recent button click
      const sortedMovies = movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    displaySearchResult(sortedMovies)
    console.log(sortedMovies)
    });
  }
  for (let i = 0; i < mostPopularEl.length; i++) {
    mostPopularEl[i].addEventListener("click", function() {
      // Add code to handle most recent button click
      const popularMovies = movies.sort((a, b) => (b.popularity) - (a.popularity));
    displaySearchResult(popularMovies)
    });
  }
  for (let i = 0; i < mostWatchedEl.length; i++) {
    mostWatchedEl[i].addEventListener("click", function() {
      // Add code to handle most recent button click
      const WatchedMovies = movies.sort((a, b) => (b.vote_average) - (a.vote_average));
    displaySearchResult(WatchedMovies)
    });
  }

  
})()