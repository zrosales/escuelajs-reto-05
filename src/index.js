const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
//const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';
localStorage.clear();


const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
      localStorage.setItem('next_fetch', response.info.next);
    })
    .catch(error => console.log(error));
}

const loadData = async function() {
  try{
    const next_fetch = localStorage.getItem('next_fetch');
    if (next_fetch){
      await getData(next_fetch);
    }
    else if (typeof next_fetch === 'string' && next_fetch==""){
      console.log("Ya no hay mas personajes");
      alert ("Ya no hay mas personajes");
      intersectionObserver.unobserve($observe);
    }
    else {
      await getData(API);
    } 
  }
  catch(error) {
    console.log(error)
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);