import {
    addItemToPage,
    renderItemsList,
    clearInputs,
    getInputValues,
} from "./dom_util.js";

import {
    getAllPLanes,
    postPlanes,
    deletePlanes,
} from "./API/api.js";

const inputName = document.getElementById('input-name');
const inputVolume = document.getElementById('input-volume');
const inputPassengers = document.getElementById('input-passengers');
const itemsContainer = document.getElementById('items-container');
const modal = document.getElementById("modal");
const create = document.getElementById('create');
const findInput = document.getElementById('search-input');
const findButton = document.getElementById('search');
const cancelFindButton = document.getElementById('cancel');
const countPassengersButton = document.getElementById('count-passengers');
const passengerCountDisplay = document.getElementById('passenger-count');
const sortButton = document.getElementById('sort-button');
const sortOptions = document.getElementById('sort-options');
const openModalBtn = document.getElementById("create-plane");
const closeModalBtn = document.getElementsByClassName("close-btn")[0];

let planes = []; 
let currentEditId = null;

const handleEdit = (id) => {
    const itemToEdit = planes.find(plane => plane.id === id);
    
    if (itemToEdit) {
        currentEditId = id;

        inputName.value = itemToEdit.name;
        inputVolume.value = itemToEdit.volume;
        inputPassengers.value = itemToEdit.passengers;

        modal.style.display = "flex";
    }
};

create.addEventListener('click', async (event) => {
    event.preventDefault();

    const value = getInputValues(); 

    if (!value.name || !value.volume || !value.passengers) {
        alert("Please fill in all fields to create a plane.");
        return;
    }

    if (currentEditId) {
        const index = planes.findIndex(plane => plane.id === currentEditId);
        if (index !== -1) {
            planes[index] = { ...planes[index], ...value };
            currentEditId = null;
        }
    } else {
        const newPlaneData = {
            name: value.name,
            volume: value.volume,  
            passengers: value.passengers,
        };

        try {
            await postPlanes(newPlaneData);
            planes.push(newPlaneData);
            renderItemsList(planes); 
        } catch (error) {
            console.error('Error adding plane:', error);
            alert('Error adding plane. Please check the console for details.');
        }
    }
    
    clearInputs();
});



document.addEventListener("DOMContentLoaded", () => {
    modal.style.display = "none";
    document.body.classList.add('loaded');
    fetch('http://localhost:1337/planes')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Fetch error:', error));
});

document.addEventListener("click", async (event) => {
    if (event.target && event.target.classList.contains("btn-info")) {
        const id = event.target.id.split("-")[0];
        handleEdit(id);
    }

    if (event.target && event.target.classList.contains("btn-del")) {
        const id = event.target.id.split("-")[0];  // Extract plane ID
        const confirmDelete = confirm("Are you sure you want to delete this plane?");
        if (confirmDelete) {
            try {
                await deletePlanes(id);  // Call delete API
                // Reload the page to fetch the updated list
                location.reload();
            } catch (error) {
                console.error(`Error deleting plane with id ${id}:`, error);
                alert('Error deleting plane. Please try again.');
            }
        }
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

openModalBtn.onclick = function() {
    modal.style.display = "block";
};

closeModalBtn.onclick = function() {
    modal.style.display = "none";
    clearInputs();
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearInputs();
    }
};

async function refetchAllPlanes() {
    const allPlanes = await getAllPLanes();

    planes = allPlanes;

    renderItemsList(planes);
}

refetchAllPlanes();