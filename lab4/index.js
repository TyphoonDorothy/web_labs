import {
    addItemToPage,
    renderItemsList,
    clearInputs,
    getInputValues,
} from "./dom_util.js";

const create = document.getElementById('create');
const findInput = document.getElementById('search-input');
const findButton = document.getElementById('search');
const cancelFindButton = document.getElementById('cancel');
const countPassengersButton = document.getElementById('count-passengers');
const passengerCountDisplay = document.getElementById('passenger-count');
const sortButton = document.getElementById('sort-button');
const sortOptions = document.getElementById('sort-options');

let planes = []; 

create.addEventListener('click', (event) => {
    event.preventDefault();
    let value = getInputValues();
    if (value != -1) {
        console.log(value);
        planes.push(value);
        addItemToPage(value);
        console.log(planes);
        clearInputs();
    }
});

findButton.addEventListener("click", () => {
    const foundPlane = planes.filter(
      (plane) => plane.name.search(findInput.value) !== -1
    );
  
    renderItemsList(foundPlane);
});
  
cancelFindButton.addEventListener("click", () => {
    renderItemsList(planes);
    findInput.value = "";
});

countPassengersButton.addEventListener('click', () => {
    const totalPassengers = planes.reduce((sum, plane) => sum + Number(plane.passengers), 0);
    passengerCountDisplay.textContent = `Total number of passengers: ${totalPassengers}`;
});

sortButton.addEventListener('click', () => {
    const sortBy = sortOptions.value;

    if (sortBy === 'name') {
        planes.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'volume') {
        planes.sort((a, b) => Number(b.volume) - Number(a.volume));
    } else if (sortBy === 'passengers') {
        planes.sort((a, b) => Number(b.passengers) - Number(a.passengers)); 
    }

    renderItemsList(planes);
});
