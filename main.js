console.log("main.js connected");

const handleFormInputFocus = () => {
  console.log(`focus occured`);
};

const SearchTermsInput = document.body.querySelector("#search-terms");

SearchTermsInput.addEventListener("focus", handleFormInputFocus);
