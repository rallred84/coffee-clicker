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
  let coffeeCountStatment = document.getElementById('coffee-count');
  coffeeCountStatment.textContent = `Coffee: ${coffeeCount}`;
});

//adding a producer buy card
for (i in coffeeProducers) {
  const producerShop = document.getElementById('producer-shop');
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
  producerShop.appendChild(producer);
}
