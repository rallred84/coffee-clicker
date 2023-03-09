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
  },
  {
    id: 1,
    name: 'French Press Machine',
    quantity: 0,
    rate: 2,
    cost: 50,
  },
  {
    id: 2,
    name: 'Mr. Coffee Machine',
    quantity: 0,
    rate: 3,
    cost: 100,
  },
  {
    id: 3,
    name: 'Nespresso',
    quantity: 0,
    rate: 12,
    cost: 500,
  },
  {
    id: 4,
    name: 'Breville Oracle Touch',
    quantity: 0,
    rate: 20,
    cost: 1000,
  },
  {
    id: 5,
    name: 'LA Spazile',
    quantity: 0,
    rate: 95,
    cost: 5000,
  },
  {
    id: 6,
    name: 'Victoria Arduino Black Eagle',
    quantity: 0,
    rate: 175,
    cost: 10000,
  },
  {
    id: 7,
    name: 'Nuova Simonelii',
    quantity: 0,
    rate: 400,
    cost: 25000,
  },
  {
    id: 8,
    name: 'EV Ersys Shotmaster',
    quantity: 0,
    rate: 1500,
    cost: 100000,
  },
  {
    id: 9,
    name: 'La Marzo Strada',
    quantity: 0,
    rate: 6000,
    cost: 500000,
  },
];

//Grabbing sections of the DOM that we will be manipulating and/or listening to with our js
const producerShop = document.getElementById('producer-shop'); //The right column that houses our producer buy cards
const coffeeImage = document.getElementById('coffee-pic'); //Our image button that we click to add coffee manually
const scoreboard = document.querySelector('#coffee-count'); //The current tally of total coffees
const rate = document.querySelector('#coffee-rate'); //The current coffee/second rate

//Event listener for coffee button
coffeeImage.addEventListener('click', () => {
  coffeeCount++;
  scoreboard.textContent = `Coffee: ${coffeeCount.toLocaleString('en-US')}`;
});

//Event listener for scoreboard
//Not sure if this is the best way, but DOMSubtreeModified 'fires when the structure of the DOM tree changes'...so when the count changes on the scoreboard, this listener will fire (also worked with DOMNodeInserted and DOMNodeRemoved)
scoreboard.addEventListener('DOMSubtreeModified', createProducer);

//We want to make a function that will create a producer card when the coffee score gets to half the producer's cost. As we create producers we will store them in an Active Producer array (activeProducers)

const activeProducers = [];

function createProducer() {
  //Iterates through list of producers, and if it the current coffee total is equal to or greater than half of that producer's cost, will create that producer and later append it if it does not already exist in DOM
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
  <span class = "quantity">Quantity: ${coffeeProducers[
    i
  ].quantity.toLocaleString('en-US')}</span>
  <span class = "rate">Coffee/Second: ${coffeeProducers[i].rate}</span>
  <span class = "cost">Cost: ${coffeeProducers[i].cost.toLocaleString(
    'en-US'
  )} coffee</span>
</div>
</div>
`;
      //Need to create a button specific to this producer so that it can perform producer specific actions when clicked
      createBuyButton(producer, i);

      let alreadyExists = checkIfExists(i);
      //Will only append new producer if it does not already exist in the DOM
      if (!alreadyExists) {
        producerShop.appendChild(producer);
        activeProducers.push(coffeeProducers[i].name);
      }
    }
  }
}

function checkIfExists(i) {
  let alreadyExistsBoolean = false;
  //If no active producers in activeProducers array, it can be assumed that it does not exist
  if (activeProducers.length !== 0) {
    //If the current producer matches one of the already active producers, set alreadyExists to true
    activeProducers.forEach((producerName) => {
      if (producerName === coffeeProducers[i].name) {
        alreadyExistsBoolean = true;
      }
    });
  }
  return alreadyExistsBoolean;
}

// We want to create a "Buy Button" inside the producer element
function createBuyButton(producer, i) {
  let button = producer.querySelector('button');
  button.addEventListener('click', () => {
    //If you dont  have enough coffee, alert 'You need more coffee!'
    if (coffeeCount < coffeeProducers[i].cost) {
      alert('You need more coffee!');
    } else {
      // When clicked needs to:
      //  Add 1 Quantity and (product specific) coffee/second
      updateProducerInfo(producer, i);
      //Remove (product specific) cost of producer from total coffee
      coffeeCount -= coffeeProducers[i].cost;
      scoreboard.textContent = `Coffee: ${coffeeCount.toLocaleString('en-US')}`;
      //Increase the Cost of an item by 25% each time that item is purchase
      coffeeProducers[i].cost = Math.floor(coffeeProducers[i].cost * 1.25);
      let cost = producer.querySelector('.cost');
      cost.textContent = `Cost: ${coffeeProducers[i].cost.toLocaleString(
        'en-US'
      )} coffee`;
    }
  });
}

function updateProducerInfo(producer, i) {
  //Create quantity element inside producer and add 1 quantity to it, then update text content in DOM
  let quantity = producer.querySelector('.quantity');
  coffeeProducers[i].quantity += 1;
  quantity.textContent = `Quantity: ${coffeeProducers[
    i
  ].quantity.toLocaleString('en-US')}`;
  //Add producer specific rate quanity to total coffe/second rate, then update text content in DOM
  coffeeRate += coffeeProducers[i].rate;
  rate.textContent = `${coffeeRate.toLocaleString('en-US')} coffee/second`;
}

//Want to create a function to add auto generated coffee once per second at a rate set by the purchased producers

//This function can start as soon as the page is loaded since the initial rate is 0 coffee per second

setInterval(automateCoffee, 1000);

function automateCoffee() {
  coffeeCount = coffeeCount + coffeeRate;
  scoreboard.textContent = `Coffee: ${coffeeCount.toLocaleString('en-US')}`;
}
