const updateCounterUrl = "http://localhost:3000/api/updatecounter";
const getCounterUrl = "http://localhost:3000/api/getcounter";

const counterElement = document.getElementById("counter");
const buttonElement = document.getElementById("increment-button");


const updateCounter = () => {
  buttonElement.disabled = true;

  fetch(updateCounterUrl)
    .then((response) => response.text())
    .then((text) => {
      counterElement.innerText = `Counter: ${text}`;
    })
    .finally(() => {
      buttonElement.disabled = false;
    });
};


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

setInterval(getCounter, 1000);

const tweetCounter = () => {
  const counternumber = counterElement.innerText.split(": ")[1];
  const tweetUrl = `https://twitter.com/intent/tweet?text=I%20apply%20for%20%40stark_finance%20first%20institutional%20grade%20defi%20Yield%20launching%20on%20%40zksync%20%0D%0A%0D%0AStark%20will%20shine%20soon%2C%20%E2%9C%A8%20%20&original_referer=https://clicktotweet.com&related=tweetdripapp`;
  window.open(tweetUrl, "_blank");

};



buttonElement.addEventListener("click", (event) => {
  updateCounter();
  buttonElement.innerText = "Applied";
});
