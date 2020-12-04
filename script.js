let form = document.getElementById("form");
const destination = document.getElementById("destination_name");
const newLocation = document.getElementById("location");
const photo = document.getElementById("photo");
const description = document.getElementById("description");
const wishlist = document.getElementById("wishlist");

form.onsubmit = (e) => {
  e.preventDefault();
  let destinationValue = destination.value;
  let locationValue = newLocation.value;
  let photoValue = URL.createObjectURL(photo.files[0]);
  let descriptionValue = description.value;

  wishlist.innerHTML += `<li class="card">
  <div class="card_div">
  <img src="${photoValue}" width="400">
  <h1>${destinationValue}</h1>
  <p>${locationValue}</p>
  <button id="delete_button">Remove</button>
  <button id="edit_button">Edit</button>
  </div>
  </li>`;

  form.reset();
};

onclick = (e) => {
  if (e.target.matches("button#delete_button")) {
    e.target.parentNode.remove();
  }
  if (e.target.matches("button#edit_button")) {
    let editedDestination = prompt("Enter new destination name");
    let editedLocation = prompt("Enter a new location");
    let editedPhoto = prompt("Enter a new photo");

    e.target.parentNode.innerHTML = `
        <img src="${editedPhoto}">
        <h1>${editedDestination}</h1>
        <p>${editedLocation}</p>
        <button id="delete_button">Remove</button>
        <button id="edit_button">Edit</button>
    `;
  }
};
