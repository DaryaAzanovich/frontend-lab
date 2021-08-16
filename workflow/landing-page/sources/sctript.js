window.addEventListener("load", function ready() {
    document.body.classList.remove('preload');
    uploadGifs(offset);
});

const searchBtn = document.querySelector('.search-btn');
const searchWindow = document.querySelector('.search-window');
const closeBtn = document.querySelector('.close-btn');
const burgerBtn = document.querySelector('.nav__burger-menu');
const dropdownMenu = document.querySelector('.dropdown-menu')

searchBtn.addEventListener('click', function () {
    searchWindow.classList.remove('closed-search-window');
})

closeBtn.addEventListener('click', function () {
    searchWindow.classList.add('closed-search-window');
})

burgerBtn.addEventListener('click', function() {
    dropdownMenu.classList.toggle('closed-dropdown-menu');
})


/*=========================== GIPHY API =================================*/
const MAX_OFFSET = 4999;
const API_KEY = 'HWXlq6vqGYVF4HOKSQZmzS5Fjdn7dWwx';

const cardsImg = document.getElementsByClassName('card-img');
const cardsDate = document.getElementsByClassName('card-date');
const cardContent = document.getElementsByClassName('card-content');
const imgLink = document.getElementsByName('gif-link');

const leftBtn = document.querySelector('.pag-left');
const rightBtn = document.querySelector('.pag-right');

const cardsAmount = 9;

let offset = 0,
    currentOffset = offset;

let search = ['cute', 'cat'].join('+');


let imgBlackout = '<div class="img-blackout"><div class="link-btn"><a href="#" name="gif-link"><i class="fas fa-link"></i></a></div></div>';

function uploadGifs(currOffset) {
    let url = new URL(`https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${API_KEY}&limit=${cardsAmount}&offset=${currOffset}`);

    fetch(url)
        .then(response =>  response.json())
        .then(json => {
            document.querySelector('.cards-wrap').innerHTML = '';

            json.data
            .forEach(gif => createCards(gif))
        })
        .catch(error => {
            console.log(error);
        });
}

function createCards(gif) {
    const card = createElem('div', 'card');
    const cardImg = createElem('div', 'card-img');
    const cardContent = createElem('div', 'card-content');
    const img = createElem('img', '');
    const title = createElem('h4', '');
    const cardDate = createElem('p', 'card-date');
    const cardText = createElem('p', 'card-text');

    img.src = gif.images.fixed_height.url;
    img.alt = gif.title;
    imgBlackout = imgBlackout.replace('#', gif.url);
    
    title.textContent = gif.title; 
    cardDate.textContent = (new Date()).toLocaleString(); 
    cardText.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, deleniti, id quibusdam aut optio saepe soluta tempore neque voluptatum.';

    cardImg.appendChild(img);
    cardContent.appendChild(title);
    cardContent.appendChild(cardDate);
    cardContent.appendChild(cardText);

    img.insertAdjacentHTML('afterend', imgBlackout);

    card.appendChild(cardImg);
    card.appendChild(cardContent);

    document.querySelector('.cards-wrap').appendChild(card);
}

function createElem(tag, elemClassName) {
    const elem = document.createElement(tag);
    elem.className = elemClassName;

    return elem;
}

leftBtn.addEventListener('click', function(event) {
    if(currentOffset > 0) {
        currentOffset -= cardsAmount;

        uploadGifs(currentOffset);
    } else {
        currentOffset = 0;
    }
})

rightBtn.addEventListener('click', function(event) {
    currentOffset += cardsAmount;

    if(currentOffset < MAX_OFFSET) {
        uploadGifs(currentOffset);
    } else {
        currentOffset = MAX_OFFSET;
    }
})
