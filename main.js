console.log("main.js connected");

const searchTermsInput = document.body.querySelector('#search-terms');

const getCardData = async () => {
        const cardDataApiURL = "https://db.ygoprodeck.com/api/v7/cardinfo.php"
        try {
            const response = await fetch(cardDataApiURL)
            const data = response.json();
            console.log(`data: `, data)
        } catch (error) {
            console.log(error)
            alert('something went wrong')
        }
        
        
}

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
