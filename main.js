console.log("main.js connected");

const searchTermsInput = document.body.querySelector('#search-terms');
const cardForm = document.querySelector('#card-form');
const resultsContainer = document.querySelector('#results-container');
const deckContainer = document.querySelector('#deck-container');
const cardInfoBox = document.querySelector('#card-info-box');

let deck = [];
        try {
            const response = await fetch(cardDataApiURL);
            const data = await response.json();
            const limitedCards = data.data.slice(0,15);
            return data.data;
        } catch (error) {
            console.log(error)
            alert('Something went wrong, please try again later.')
        }

};

const displayCards = (cards) => {
    while (resultsContainer.firstChild) {

    }
    
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        const cardName = document.createElement('h3');
        cardName.textContent = card.name;
        cardDiv.appendChild(cardName);
        
        cardDiv.addEventListener('click', () => {
            displayCardInfo(card);
        });

        resultsContainer.appendChild(cardDiv);
    });
};

const addCardToDeck = (card) => {
    if (deck.length < 40) {
        deck.push(card);
        updateDeck();
    } else {
        alert("Your deck is full!");
    }
};
const updateDeck = () => {
    deckContainer.innerHTML = '';

    deck.forEach(card => {
        const deckCardDiv = document.createElement('div');
        deckCardDiv.classList.add('deck-card');
        deckCardDiv.textContent = card.name;

        deckCardDiv.addEventListener('click', () => {
            removeCardFromDeck(card);
         });

        deckContainer.appendChild(deckCardDiv);
    });
};

const handleFormSubmit = async (event) => {
    event.preventDefault();

    const searchTerm = searchTermsInput.value.trim();
    if (searchTerm !== '') {
        const cards = await getCardData(searchTerm);
        displayCards(cards);
    }
};

cardForm.addEventListener("submit", handleFormSubmit);
