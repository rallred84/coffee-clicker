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
    quantity: 12,
    rate: 2,
    cost: 50,
    isVisible: false,
  },
  {
    id: 2,
    name: 'Mr. Coffee Machine',
    quantity: 4,
    rate: 3,
    cost: 100,
    isVisible: false,
  },
];

//event listener for coffee button
const coffeeImage = document.getElementById('coffee-pic');

coffeeImage.addEventListener('click', () => {
  coffeeCount++;
  scoreboard.textContent = `Coffee: ${coffeeCount}`;
});

//event listener for scoreboard
const scoreboard = document.querySelector('#coffee-count');

//Not sure if this is the best way, but DOMSubtreeModified 'fires when the structure of the DOM tree changes'...so when the count changes on the scoreboard, this listener will fire (also worked with DOMNodeInserted and DOMNodeRemoved)
scoreboard.addEventListener('DOMSubtreeModified', addProducer);

//We want to make a function to make producer appear in producer list when the coffee score gets to half the producer's cost

let activeProducers = [];

function addProducer() {
  for (i in coffeeProducers) {
    const producerShop = document.getElementById('producer-shop');
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
      // Only want to append the producer's buy card (producer) if the producer does not already exist in the active producer list (activeProducers)
      //if no active producers, add it
      if (activeProducers.length === 0) {
        producerShop.appendChild(producer);
        activeProducers.push(coffeeProducers[i].name);
      } else {
        //If there are active producers, check to see if the current one matches any of them. Assumes it does not exist unless otherwise proven to. If it already exists, code will not run, if not code WILL run

        //['Basic Coffee Roast Machine', 'French Press Machine']
        let alreadyExists = false;
        for (producerName of activeProducers) {
          if (producerName === coffeeProducers[i].name) {
            alreadyExists = true;
          }
        }
        if (alreadyExists === false) {
          producerShop.appendChild(producer);
          activeProducers.push(coffeeProducers[i].name);
        }
      }
    }
  }
}

function appendProducer() {}
