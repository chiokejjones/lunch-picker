const restaurantList = document.getElementById('restaurants');
const addRestaurantButton = document.getElementById('add-restaurant');
const randomizeButton = document.getElementById('randomize');
let restaurants = []; // Array to store restaurants and their last picked time

// Function to load restaurants from localStorage (if available)
function loadRestaurants() {
  const storedRestaurants = localStorage.getItem('restaurants');
  if (storedRestaurants) {
    restaurants = JSON.parse(storedRestaurants);
  }
  updateRestaurantList();
}

// Function to update the displayed restaurant list
function updateRestaurantList() {
  restaurantList.innerHTML = '';
  if (restaurants.length > 0) {
    const list = document.createElement('ul');
    restaurants.forEach(restaurant => {
      const listItem = document.createElement('li');
      listItem.textContent = restaurant.name;
      if (restaurant.lastPicked) {
        listItem.textContent += ` (Last Picked: ${restaurant.lastPicked})`;
      }
      list.appendChild(listItem);
    });
    restaurantList.appendChild(list);
  } else {
    restaurantList.textContent = 'No restaurants added yet.';
  }
}

// Function to add a new restaurant
function addRestaurant() {
  const restaurantName = prompt('Enter restaurant name:');
  if (restaurantName) {
    restaurants.push({ name: restaurantName });
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
    updateRestaurantList();
  }
}

// Function to randomize and pick a restaurant
function pickRandomRestaurant() {
  if (restaurants.length === 0) {
    alert('Please add some restaurants first!');
    return;
  }
  const randomIndex = Math.floor(Math.random() * restaurants.length);
  const pickedRestaurant = restaurants[randomIndex];
  pickedRestaurant.lastPicked = new Date().toLocaleDateString();
  localStorage.setItem('restaurants', JSON.stringify(restaurants));
  updateRestaurantList();
  alert(`Let's eat at ${pickedRestaurant.name}!`);
}

// Load restaurants on page load
loadRestaurants();

// Event listeners for buttons
addRestaurantButton.addEventListener('click', addRestaurant);
randomizeButton.addEventListener('click', pickRandomRestaurant);