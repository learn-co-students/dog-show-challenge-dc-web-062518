document.addEventListener('DOMContentLoaded', () => {
  let form = document.getElementById("dog-form");
  window.addEventListener('load', fetchDogs);
  form.addEventListener('submit', patchFetch);
})

function fetchDogs() {
  fetch ('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(json => json.forEach(dog => {
       render(dog)
     }))
}

function render(dog) {
  let registeredDogs = document.querySelector('thead');
  let tr = document.createElement('tr');
  let name = document.createElement('td');
  let breed = document.createElement('td');
  let sex = document.createElement('td');
  let id = document.createElement('td');
  let editButton = document.createElement('button');

  tr.setAttribute("id", dog.id)
  name.setAttribute("name", "name");
  breed.setAttribute("name", "breed");
  sex.setAttribute("name", "sex");
  // editButton.setAttribute("id", dog.id);
  editButton.innerText = "Edit";
  name.innerText = dog.name;
  breed.innerText = dog.breed;
  sex.innerText = dog.sex;
  tr.appendChild(name);
  tr.appendChild(breed);
  tr.appendChild(sex);
  tr.appendChild(editButton);
  editButton.addEventListener('click', editDog);
  registeredDogs.appendChild(tr);
}

function editDog(event){
  event.preventDefault();
  let id = event.target.parentElement.id
  let dog = event.currentTarget.parentElement;
  let form = document.getElementById("dog-form");

  form.setAttribute("id", id)
  form.name.setAttribute("placeholder", dog.cells[0].innerText);
  form.breed.setAttribute("placeholder", dog.cells[1].innerText);
  form.sex.setAttribute("placeholder", dog.cells[2].innerText);
}


function patchFetch(event){
  event.preventDefault()
  let id = event.target.id
  let name = event.target.children[0].value;
  let breed = event.target.children[1].value;
  let sex = event.target.children[2].value;


  fetch (`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name,
      breed: breed,
      sex: sex
    })
  }).then(response => response.json())
    .then(json => {
      console.log(json)
      let form = document.getElementById(json.id)
      form.id = "dog-form"
      let dog = document.getElementById(json.id)
      dog.cells[0].innerText = json.name
      dog.cells[1].innerText = json.breed
      dog.cells[2].innerText = json.sex
    })

}

// let dog =
// let registeredDogs = document.querySelector('thead');
// registeredDogs.removeChild(json)
// fetchDogs();
//
// // event.target.id = "dog-form"
// let dogToEdit = document.getElementById(id)
