document.addEventListener('DOMContentLoaded', () => {
displayDogs()
let dogSubmit = document.getElementById('submitButton')
dogSubmit.addEventListener('click', patchFetch)
})


function displayDogs() {
  fetch(`http://localhost:3000/dogs`)
  .then(response => response.json())
  .then(json => {
    for(const dog of json) {
      render(dog)
    }
  })
}

function render(dog){
  let dogTable = document.getElementById('table-body')
  let table = document.createElement('tr')
  let name = document.createElement('td')
  let breed = document.createElement('td')
  let sex = document.createElement('td')
  let tdButton = document.createElement('td')
  let editButton = document.createElement('button')


  dogTable.appendChild(table)
  table.appendChild(name)
  table.appendChild(breed)
  table.appendChild(sex)
  table.appendChild(tdButton)
  tdButton.appendChild(editButton)

  table.id = `dog-${dog.id}`
  name.id = `name-${dog.id}`
  breed.id = `breed-${dog.id}`
  sex.id = `sex-${dog.id}`
  name.innerText = dog.name
  breed.innerText = dog.breed
  sex.innerText = dog.sex

  editButton.innerText = "Edit This Dog!"
  editButton.addEventListener('click', editDog)
}

function editDog(event) {
  let dog = event.currentTarget.parentNode.parentNode
  let dogForm = document.getElementById('dog-form')
  let editName = dog.querySelectorAll('td')[0].innerText
  let editBreed = dog.querySelectorAll('td')[1].innerText
  let editSex = dog.querySelectorAll('td')[2].innerText
  dogForm.querySelectorAll('input')[0].value = editName
  dogForm.querySelectorAll('input')[1].value = editBreed
  dogForm.querySelectorAll('input')[2].value = editSex
  document.querySelector('#id-edit').value = dog.id.split("-")[1]
}

function patchFetch(event) {
  event.preventDefault()
  let id = document.querySelector('#id-edit').value
  let dogForm = document.getElementById('dog-form')
  let name = dogForm.querySelectorAll('input')[0].value
  let breed = dogForm.querySelectorAll('input')[1].value
  let sex = dogForm.querySelectorAll('input')[2].value
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify ({
    name: name,
    breed: breed,
    sex: sex,
    })
  }).then(response => response.json())
  .then(json => {
    dogForm.reset()
    let dog = document.getElementById(`dog-${json.id}`)
    dog.querySelectorAll('td')[0].innerText = json.name
    dog.querySelectorAll('td')[1].innerText = json.breed
    dog.querySelectorAll('td')[2].innerText = json.sex
  })
}
