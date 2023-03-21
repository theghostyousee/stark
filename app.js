const updateCounterUrl = "https://stark-8nol.vercel.app/updatecounter";
const getCounterUrl = "https://stark-8nol.vercel.app/getcounter";

// Get the counter and button elements
const counterElement = document.getElementById("counter");
const buttonElement = document.getElementById("increment-button");

// Function to update the counter element
const updateCounter = () => {
  // Disable the button until the API call is complete
  buttonElement.disabled = true;

  fetch(updateCounterUrl)
    .then((response) => response.text())
    .then((text) => {
      counterElement.innerText = `Counter: ${text}`;
    })
    .finally(() => {
      // Re-enable the button once the API call is complete
      buttonElement.disabled = false;
    });
};

// Function to get the counter value and display it in the counter element
const getCounter = () => {
  fetch(getCounterUrl)
    .then((response) => response.text())
    .then((text) => {
      counterElement.innerText = `Total Entry: ${text}`;
    })
    .catch((error) => {
      console.error(error);
      counterElement.innerText = "Error retrieving counter";
    });
};

// Update the counter element initially, but only if it hasn't been updated yet
setInterval(getCounter, 1000);

// Function to tweet the counter value
const tweetCounter = () => {
  const counternumber = counterElement.innerText.split(": ")[1];
  const tweetUrl = `https://twitter.com/intent/tweet?text=I'm the %23${counternumber}th person to apply for @StarkFinance`;
  window.open(tweetUrl, "_blank");
};


https://twitter.com/intent/tweet?text=I%27m%20the%20%232th%20person%20to%20apply%20for%20%40StarkFinance%20

// Add an event listener to the button
buttonElement.addEventListener("click", (event) => {
  // Prevent the default behavior of the button
  event.preventDefault();

  // Change the button text to "Sent"
  buttonElement.innerText = "Applied";
  // Call the updateCounter function to send the API request
  updateCounter();

  setTimeout(() => {

    tweetCounter();
  }, 500);
});
