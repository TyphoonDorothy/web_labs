const inputName = document.getElementById('input-name');
const inputVolume = document.getElementById('input-volume');
const inputPassengers = document.getElementById('input-passengers');
const itemsContainer = document.getElementById('items-container');

const itemTemplate = ({ id, name, volume, passengers }) => `
<li id="${id}" class="card mb-3 item-card">
  <img
    src="https://cdn-icons-png.flaticon.com/512/5566/5566691.png"
    class="item-container__image card-img-top" alt="card" style="width=45px">
  <div class="card-body">
    <p class="card-title">Name: ${name}</p>
    <p class="card-text-volume">Fuel volume: ${volume} litres</p>
    <p class="card-text-passengers">Number of passengers: ${passengers} people</p>
    <button id="${id}-edit" type="button" class="btn-info">
      Edit
    </button>
  </div>
</li>`;

export const clearInputs = () => {
  inputName.value = "";
  inputVolume.value = "";
  inputPassengers.value = "";
};

export const addItemToPage = ({ id, name, volume, passengers }) => {
  console.log("Adding item:", id, name, volume, passengers);

  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, name, volume, passengers })
  );
};

export const getInputValues = () => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: inputName.value.trim(), // Using trim() to avoid whitespace
    volume: inputVolume.value.trim(),
    passengers: inputPassengers.value.trim(),
  };
};


export const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item);
  }
};

document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("create-plane");
  const closeModalBtn = document.getElementsByClassName("close-btn")[0];

  // Open modal when button is clicked
  openModalBtn.onclick = function() {
      modal.style.display = "block";
  };

  // Close modal when close button (X) is clicked
  closeModalBtn.onclick = function() {
      modal.style.display = "none";
  };

  // Close modal when clicking outside of the modal content
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  };
});
