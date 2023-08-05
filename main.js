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

const handleFormInputFocus = async () => {
  console.log(`focus occured`);

 await getCardData()
};

searchTermsInput.addEventListener("focus", handleFormInputFocus);
