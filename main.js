console.log("main.js connected");

document.addEventListener("DOMContentLoaded", () => {
    const searchTermsInput = document.querySelector('#search-terms');
    const cardForm = document.querySelector('#card-form');
    const resultsContainer = document.querySelector('#results-container');
    const deckContainer = document.querySelector('#deck-container');
    const cardInfoBox = document.querySelector('#card-info-box');

    let deck = [];

    const getCardData = async (name) => {
        const cardDataApiURL = `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${name}`;
        try {
            const response = await fetch(cardDataApiURL);
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.log(error);
            alert('Something went wrong, please try again later.');
        }
    };

    const displayCards = (cards) => {
        while (resultsContainer.firstChild) {
            resultsContainer.removeChild(resultsContainer.firstChild);
        }
        
        cards.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const cardName = document.createElement('h4');
            cardName.textContent = card.name;
            cardDiv.appendChild(cardName);

            cardDiv.addEventListener('click', () => {
                if (deck.includes(card)) {
                    displayCardInfo(card);
                } else {
                    addCardToDeck(card);
                }
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
        deckContainer.innerText = ''; 

        const deckList = document.createElement('ul');

        deck.forEach((card, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${card.name}`;
            deckList.appendChild(listItem);
        });
        deckContainer.appendChild(deckList);
    };

    const removeCardFromDeck = (card) => {
        deck = deck.filter(c => c !== card);
        updateDeck();
        clearCardInfo();
    };

    const displayCardInfo = (card) => {
        cardInfoBox.innerText = '';

        const cardInfoDiv = document.createElement('div');
        cardInfoDiv.classList.add('card-info-box');

        const cardName = document.createElement('h3');
        cardName.textContent = card.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove from Deck';
        removeButton.addEventListener('click', () => {
            removeCardFromDeck(card);
        });

        cardInfoDiv.appendChild(cardName);
        cardInfoDiv.appendChild(removeButton);

        cardInfoBox.appendChild(cardInfoDiv);
    };

    const clearCardInfo = () => {
        cardInfoBox.innerText = '';
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
});