console.log("main.js connected");

const searchTermsInput = document.body.querySelector('#search-terms');
const cardForm = document.querySelector('#card-form');
const resultsContainer = document.querySelector('#results-container');

const getCardData = async (name) => {
        const cardDataApiURL = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
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
        
        resultsContainer.appendChild(cardDiv);
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
