const global = {
    currentPage : window.location.pathname,
    search: {
      type: '',
      term: '',
      page: 1, 
      totalPage: 1,
      totalResults: 0
    }, 
    api: {
      apiKey:'8ad5a926fabd3fd82a3b7ee5d9bca139' ,
      apiUrl: 'https://api.themoviedb.org/3'
    }
}




//// desplay 20 popular movies 

async function displayPopularMovies() {
    const {results} = await fetchDataFromTmdb('movie/popular'); 
    
    results.forEach(result => {
        
        const div = document.createElement('div'); 
        div.classList.add('card'); 
        div.innerHTML = `
          <a href="movie-details.html?id=${result.id}">
          ${result.poster_path? 
            `  <img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${result.title}"
            />`: 
            `  <img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${result.title}"
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${result.release_date}</small>
            </p>
          </div>
        `
        document.querySelector('#popular-movies').appendChild(div); 
    })
    
}


//// desplay 20 popular tvshows 

async function displayPopularTvShowes() {
    const {results} = await fetchDataFromTmdb('tv/popular'); 
    
    results.forEach(result => {
        
        const div = document.createElement('div'); 
        div.classList.add('card'); 
        div.innerHTML = `
          <a href="tv-details.html?id=${result.id}">
          ${result.poster_path? 
            `  <img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${result.name}"
            />`: 
            `  <img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${result.name}"
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air date : ${result.first_air_date}</small>
            </p>
          </div>
        `
        document.querySelector('#popular-shows').appendChild(div); 
    })
    
}

/// display movieDetails 

async function displayMovieDetails() {
    /// get the id 
    const movieId = window.location.search.split('=')[1]; 
    
    const movie = await fetchDataFromTmdb(`movie/${movieId}`); 
    
    displayBackgroundImage('movie',movie.backdrop_path); 
    
    //// create dom 
    const div = document.createElement('div'); 
    div.innerHTML = `       
     <div class="details-top">
          <div>
            ${
                movie.poster_path?   
                 `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`: 
              `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }    
      
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
                ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${
                movie.genres.map((genre) =>`<li>${genre.name}</li>`).join('')
             
             }
       
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${numberWithCommas(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span>${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${
            movie.production_companies.map((companie) => `<span>${companie.name}</span>` ).join(', ')
        }</div>
        </div>
`

document.querySelector('#movie-details').appendChild(div); 

}

//// desplay shows details 

/// display movieDetails 

async function displayShowDetails() {
  /// get the id 
  const showId = window.location.search.split('=')[1]; 
  
  const show = await fetchDataFromTmdb(`tv/${showId}`); 
  
  displayBackgroundImage('tv',show.backdrop_path); 
  
  //// create dom 
  const div = document.createElement('div'); 
  div.innerHTML = `       
   <div class="details-top">
        <div>
          ${
              show.poster_path?   
               `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`: 
            `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${show.name}"
          />`
          }    
    
        </div>
        <div>
          <h2>${show.name}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${show.vote_average.toFixed(1)} / 10
          </p>
          <p class="text-muted">Release Date: ${show.first_air_date}</p>
          <p>
              ${show.overview}
          </p>
          <h5>Genres</h5>
          <ul class="list-group">
          ${
              show.genres.map((genre) =>`<li>${genre.name}</li>`).join('')
           
           }
     
          </ul>
          <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
          <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes} </li>
          <li><span class="text-secondary">Last Episode to Air:</span> ${show.last_episode_to_air.name} </li>
          <li><span class="text-secondary">Status:</span> ${show.status} </li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${
          show.production_companies.map((companie) => `<span>${companie.name}</span>` ).join(', ')
      }</div>
      </div>
`

document.querySelector('#show-details').appendChild(div); 

}



/// function to add commas to a number 

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


///// background image 

function displayBackgroundImage(type,path) {
    const overlayDiv = document.createElement('div'); 
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`; 
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if(type == 'movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv)
    }else {
        document.querySelector('#show-details').appendChild(overlayDiv)
    }
}


//// fetch data from tmdb api 

async function fetchDataFromTmdb(endpoint) {
    try{
       
        const API_KEY = global.api.apiKey ; 
        const API_URL = global.api.apiUrl; 
        showSpiner(); 
        const res = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`); 
        if(!res){
            throw new Error('this is wrong');
             
        }
        const data = await res.json();
        hideSpinner(); 
        return data;  
    }catch(error) {
        console.log(error)
    }
}

/// spiner function 
function showSpiner() {
    document.querySelector('.spinner').classList.add('show'); 
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}


///// display slider 

async function displaySlider(){
  const { results } = await fetchDataFromTmdb('movie/now_playing'); 
  results.forEach((movie) => {
    const div = document.createElement('div'); 
    div.classList.add('swiper-slide'); 
    div.innerHTML= `
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>       
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)}
            </h4>`;
    document.querySelector('.swiper-wrapper').appendChild(div); 
    initSwiper(); 
          
  })
}

function initSwiper(){
  const swiper = new Swiper('.swiper',{
    slidesPerView: 1, 
    spaceBetween: 30, 
    freeMode: true, 
    loop: true, 
    autoplay: {
      delay: 4000, 
      disableOnInteraction: false 
    }, 
    breakpoints: {
      500: {
        slidesPerView: 2
      }, 
      700: {
        slidesPerView: 3
      }, 
      1200: {
        slidesPerView: 4
      }
    }
  })
}


/// function highLightActiveLink 

function highlightActiveLink(){
    const links = document.querySelectorAll('.nav-link'); 
    links.forEach(link => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active'); 
        }
    })
}

//// function search 

async function search() {

  const data = window.location.search; 
  const urlParam = new URLSearchParams(data); 
  global.search.term = urlParam.get('search-term'); 
  global.search.type = urlParam.get('type'); 
  if(global.search.term !== '' && global.search.term !== null){
    const {results, page, total_pages,total_results} = await searchDataFromTmdb(); 

    global.search.page = page; 
    global.search.totalPage = total_pages; 
    global.search.totalResults = total_results; 

    if(results.length == 0){
      showAlert('No Results Found')
    
    }else {
      displaySearchResult(results); 
    }
  }else{
    showAlert('plz add something to search for...')
  }
  
  
}


//// display search result

function displaySearchResult(results) {
  document.querySelector('#search-results').innerHTML = ''; 
  document.querySelector('#search-results-heading').innerHTML = ''; 
  document.querySelector('#pagination').innerHTML = ''; 
  results.forEach(result => {
        
    const div = document.createElement('div'); 
    div.classList.add('card'); 
    div.innerHTML = `
      <a href="${global.search.type}-details.html?id=${result.id}">
      ${result.poster_path? 
        `  <img
          src="https://image.tmdb.org/t/p/w500${result.poster_path}"
          class="card-img-top"
          alt="${global.search.type === 'tv'? result.name :result.title }"
        />`: 
        `  <img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${global.search.type === 'tv'? result.name :result.title }"
        />`
      }
      </a>
      <div class="card-body">
        <h5 class="card-title">${global.search.type === 'tv'? result.name :result.title}</h5>
        <p class="card-text">
          <small class="text-muted">${global.search.type === 'tv'?`First air Date`:`Release Date`} : ${global.search.type === 'tv'? result.first_air_date :result.release_date}</small>
        </p>
      </div>
    `
 
    document.querySelector('#search-results').appendChild(div); 
})

document.querySelector('#search-results-heading').innerHTML= `
    <h2>${results.length} of ${global.search.totalResults} results for ' ${global.search.term} '</h2>
`
  displayPagination(); 
}

function displayPagination() {
  const div = document.createElement('div'); 
  div.classList.add('pagination'); 
  div.innerHTML = `
     
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPage}</div>
     
  `
  document.querySelector('#pagination').appendChild(div); 

  /// disable button on first and last page 

  if(global.search.page === 1) {
    document.querySelector('#prev').disabled = true
  }
  if(global.search.page === global.search.totalPage) {
    document.querySelector('#next').disabled = true
  }

  //// get the next page 

  document.querySelector('#next').addEventListener('click',async () => {
    ++global.search.page
    const {results, total_pages} = await searchDataFromTmdb(); 
    displaySearchResult(results)
  })
  /// go to prev page
  document.querySelector('#prev').addEventListener('click',async () => {
    --global.search.page
    const {results, total_pages} = await searchDataFromTmdb(); 
    displaySearchResult(results)
  })
}

//// function show alert 

function showAlert(message,className='error') {
  const alertEl = document.createElement('div'); 
  alertEl.classList.add('alert',className); 
  alertEl.appendChild(document.createTextNode(message)); 
  document.querySelector('#alert').appendChild(alertEl); 

  setTimeout(() => alertEl.remove(),3000); 
}


//// search data from tmdb api 

async function searchDataFromTmdb() {
  try{
     
      const API_KEY = global.api.apiKey ; 
      const API_URL = global.api.apiUrl; 
      showSpiner(); 
      const res = await fetch(`${API_URL}/search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`); 
      if(!res){
          throw new Error('this is wrong');
           
      }
      const data = await res.json();
      hideSpinner(); 
      return data;  
  }catch(error) {
      console.log(error)
  }
}



function init() {
    switch(global.currentPage){
        case '/':
        case '/index.html': 
        displaySlider(); 
        displayPopularMovies(); 
            break; 
        case '/shows.html': 
             displayPopularTvShowes() 
            break; 
        case '/movie-details.html':
            displayMovieDetails(); 
            break; 
        case '/tv-details.html': 
            displayShowDetails(); 
            break; 
        case '/search.html': 
            search()
            break; 

    }

    highlightActiveLink()
}

document.addEventListener('DOMContentLoaded',init)



