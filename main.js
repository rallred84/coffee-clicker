//global variables
let coffeeCount = 0;
let coffeeRate = 0;

const coffeeProducers = [
  {
    id: 0,
    name: 'Basic Coffee Roast Machine',
    quantity: 0,
    rate: 1,
    cost: 10,
    isVisible: false,
  },
  {
    id: 1,
    name: 'French Press Machine',
    quantity: 0,
    rate: 2,
    cost: 50,
    isVisible: false,
  },
  {
    id: 2,
    name: 'Mr. Coffee Machine',
    quantity: 0,
    rate: 3,
    cost: 100,
    isVisible: false,
  },
];

//Grabbing sections of the DOM that we will be manipulating and/or listening to with our js
const producerShop = document.getElementById('producer-shop'); //The right column that houses our producer buy cards
const coffeeImage = document.getElementById('coffee-pic'); //Our image button that we click to add coffee manually
const scoreboard = document.querySelector('#coffee-count'); //The current tally of total coffees

//Event listener for coffee button
coffeeImage.addEventListener('click', () => {
  coffeeCount++;
  scoreboard.textContent = `Coffee: ${coffeeCount}`;
});

//Event listener for scoreboard
//Not sure if this is the best way, but DOMSubtreeModified 'fires when the structure of the DOM tree changes'...so when the count changes on the scoreboard, this listener will fire (also worked with DOMNodeInserted and DOMNodeRemoved)
scoreboard.addEventListener('DOMSubtreeModified', createProducer);

//We want to make a function that will create a producer card when the coffee score gets to half the producer's cost. As we create producers we will store them in an Active Producer array (activeProducers)

let activeProducers = [];

function createProducer() {
  for (i in coffeeProducers) {
    if (coffeeCount >= coffeeProducers[i].cost / 2) {
      let producer = document.createElement('div');
      producer.innerHTML = `
<div class="producer">
<div class="producer-name">
  <span>${coffeeProducers[i].name}</span>
  <button>Buy</button>
</div>
<div class="producer-info">
  <span>Quantity: ${coffeeProducers[i].quantity}</span>
  <span>Coffee/Second: ${coffeeProducers[i].rate}</span>
  <span>Cost: ${coffeeProducers[i].cost} coffee</span>
</div>
</div>
`;
      appendProducer(producer, producerShop);
    }
  }
}

// Creating a helper function to append created producers to the right column if they do not already exist in the DOM

function appendProducer(producer, producerShop) {
  //If no active producers, add it
  if (activeProducers.length === 0) {
    producerShop.appendChild(producer);
    activeProducers.push(coffeeProducers[i].name);
  } else {
    //If there are active producers, check to see if the current one matches any of the existing producers:
    //The assumption is that it does not exist unless otherwise proven to.
    let alreadyExists = false;

    activeProducers.forEach((producerName) => {
      if (producerName === coffeeProducers[i].name) {
        alreadyExists = true;
      }
    });

    //If it does not exist, code WILL run and add the producer. If it does already exist, code will NOT run
    if (!alreadyExists) {
      producerShop.appendChild(producer);
      activeProducers.push(coffeeProducers[i].name);
    }
  }
}
