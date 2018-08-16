let table = document.getElementById('table-body')

function render(dog){
  let table = document.getElementById('table-body')
  let tableRow = document.createElement('tr')
  let dogId = document.createElement('td')
  let dogName = document.createElement('td')
  let dogBreed = document.createElement('td')
  let dogSex = document.createElement('td')
  let editButton = document.createElement('button')

  table.appendChild(tableRow)

  tableRow.appendChild(dogName)
  tableRow.appendChild(dogBreed)
  tableRow.appendChild(dogSex)
  tableRow.appendChild(editButton)

  tableRow.id = `dog-${dog.id}`
  dogId.innerText = dog.id
  dogName.innerText = dog.name
  dogName.id = "name"
  dogBreed.innerText = dog.breed
  dogBreed.id = "breed"
  dogSex.innerText = dog.sex
  dogSex.id = "sex"
  editButton.innerText = "Edit Dog"
  editButton.id = dog.id
  editButton.addEventListener('click', editDog)
  let editForm = document.getElementById('dog-form')
  editForm.addEventListener('submit', updateDog)
};


function editDog(e){
  e.preventDefault();
  let editDogForm = document.getElementById('dog-form')
  let dogRow = e.currentTarget.parentNode
  editDogForm.elements.namedItem("dog-id").value = dogRow.querySelectorAll('button')[0].id
  editDogForm.elements.namedItem("name").value = dogRow.querySelectorAll('td')[0].innerText
  editDogForm.elements.namedItem("breed").value = dogRow.querySelectorAll('td')[1].innerText
  editDogForm.elements.namedItem("sex").value = dogRow.querySelectorAll('td')[2].innerText
}

document.addEventListener('DOMContentLoaded', () => {
  // editDogForm.addEventListener('submit', fetchPatch)
  fetchGet()
})


function fetchGet(){
  fetch(`http://localhost:3000/dogs`)
  .then(r => r.json())
  .then(data => {
    data.forEach(dog =>{
        render(dog)
    })
  })
}

function updateDog(e){
  e.preventDefault();
  let id = e.currentTarget.querySelectorAll('input')[0].value
  let name = e.currentTarget.querySelectorAll('input')[1].value
  let breed = e.currentTarget.querySelectorAll('input')[2].value
  let sex = e.currentTarget.querySelectorAll('input')[3].value
  if (name === "" || breed === "" || sex === ""){
    window.alert("Please fill out form.")
  } else {
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers:{
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        breed: breed,
        sex: sex
      }),
    })
  .then( r => r.json())
  .then( json => {
    let updatedDog = document.getElementById(`dog-${id}`).querySelectorAll('td')
    updatedDog[0].innerText = json.name
    updatedDog[1].innerText = json.breed
    updatedDog[2].innerText = json.sex
    let editForm = document.getElementById('dog-form')
    editForm.reset();
  });
}}


//make dog editable - create edit button that populates form
//on submit patch request must be made
