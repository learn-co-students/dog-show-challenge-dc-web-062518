document.addEventListener("DOMContentLoaded", init);

function init() {
  getAllDogs();
  let submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", editDog);
  let nameInput = document.getElementById("name-input").value;
  let breedInput = document.getElementById("breed-input").value;
  let sexInput = document.getElementById("sex-input").value;
}

function getAllDogs() {
  fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(json => {
      for (const dog of json) {
        renderDog(dog); //object
      }
    });
}

function renderDog(dog) {
  let tableBody = document.getElementById("table-body");
  let tRow = document.createElement("tr");
  let tDataName = document.createElement("td");
  let tDataBreed = document.createElement("td");
  let tDataSex = document.createElement("td");
  let editButton = document.createElement("button");
  editButton.addEventListener("click", function(event) {
    let nameInput = document.getElementById("name-input");
    let breedInput = document.getElementById("breed-input");
    let sexInput = document.getElementById("sex-input");
    let idInput = document.getElementById("dog-id");
    fillFormWithData(dog, nameInput, breedInput, sexInput, idInput);
  });
  let dogId = dog.id;
  editButton.innerText = "Edit";
  tDataName.innerText = dog.name;
  tDataBreed.innerText = dog.breed;
  tDataSex.innerText = dog.sex;
  tRow.id = dogId;
  tRow.appendChild(tDataName);
  tRow.appendChild(tDataBreed);
  tRow.appendChild(tDataSex);
  tRow.appendChild(editButton);
  tableBody.appendChild(tRow);
}

function fillFormWithData(dog, nameInput, breedInput, sexInput, idInput) {
  nameInput.value = dog.name;
  breedInput.value = dog.breed;
  sexInput.value = dog.sex;
  let id = dog.id;
  idInput.value = dog.id;
  // editDog(id, nameInput, breedInput, sexInput);
}

function editDog(event) {
  event.preventDefault();
  let id = event.target.parentElement.querySelectorAll("input")[0].value;
  let name = event.target.parentElement.querySelectorAll("input")[1].value;
  let breed = event.target.parentElement.querySelectorAll("input")[2].value;
  let sex = event.target.parentElement.querySelectorAll("input")[3].value;
  // debugger;

  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id,
      name: name,
      breed: breed,
      sex: sex
    })
  })
    .then(response => response.json())
    .then(json => {
      let dogs = json;
      let trToUpdate = document.getElementById(`${id}`);
      document.getElementById(`${id}`).cells[0].innerText = dogs.name;
      document.getElementById(`${id}`).cells[1].innerText = dogs.breed;
      document.getElementById(`${id}`).cells[2].innerText = dogs.sex;
      const dogForm = document.getElementById("dog-form");
      // debugger;
      dogForm.reset();
    });
}
