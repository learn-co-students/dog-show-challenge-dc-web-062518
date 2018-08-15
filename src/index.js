let dogForm = document.getElementById('dog-form')

document.addEventListener('DOMContentLoaded', () => {
  getFetch()
})

function render(dog) {
  let table = document.getElementById('table-body')
  let tableRow = document.createElement('tr')
  tableRow.id = `table-row-${dog.id}`
  let name = document.createElement('td')
  name.id = 'name-td'
  let breed = document.createElement('td')
  breed.id = 'breed-td'
  let sex = document.createElement('td')
  sex.id = 'sex-td'
  let editButton = document.createElement('button')
  editButton.id = `btn-id-${dog.id}`

  table.appendChild(tableRow)
  tableRow.appendChild(name)
  tableRow.appendChild(breed)
  tableRow.appendChild(sex)
  tableRow.appendChild(editButton)

  name.innerText = dog.name
  breed.innerText = dog.breed
  sex.innerText = dog.sex
  editButton.innerText = 'Edit Dog'

  editButton.addEventListener('click', editClickHandler)

  let submitButton = document.getElementById('submit-button')
  submitButton.addEventListener('click', submitButtonHandler)
}

function getFetch() {
  fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(json => {
    json.forEach( dog => {
      // console.log(dog)
      render(dog)
    })
  })
}

function editClickHandler(event) {
  // console.log(event.target.parentNode)
  let eventTarget = event.target.parentNode
  let id = eventTarget.querySelector('button').id.split('-')[2]
  let nameTd = eventTarget.querySelector('#name-td').innerText
  let breedTd = eventTarget.querySelector('#breed-td').innerText
  let sexTd = eventTarget.querySelector('#sex-td').innerText

  let dogForm = document.getElementById('dog-form')
  dogForm.elements.namedItem('id').value = id
  dogForm.elements.namedItem('name').value = nameTd
  dogForm.elements.namedItem('breed').value = breedTd
  dogForm.elements.namedItem('sex').value = sexTd

  // patchFetch(id, nameTd, breedTd, sexTd)
}

function submitButtonHandler(event){
  event.preventDefault()
  let eventTarget = event.target.parentNode
  // debugger
  // let id = eventTarget.querySelector('button').id.split('-')[2]
  let dogForm = document.getElementById('dog-form')
  let id = dogForm.elements.namedItem('id').value
  let name = dogForm.elements.namedItem('name').value
  let breed = dogForm.elements.namedItem('breed').value
  let sex = dogForm.elements.namedItem('sex').value

  patchFetch(id, name, breed, sex)
}

function patchFetch(id, name, breed, sex) {
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify ({
      name: name,
      breed: breed,
      sex: sex
    })
  })
  .then(response => response.json())
  .then(json => {
    console.log(json)
    let dogForm = document.getElementById('dog-form')
    let name = dogForm.elements.namedItem('name').value
    let breed = dogForm.elements.namedItem('breed').value
    let sex = dogForm.elements.namedItem('sex').value

    let tableRowId = document.getElementById(`table-row-${id}`)
    tableRowId.querySelector('#name-td').innerText = name
    tableRowId.querySelector('#breed-td').innerText = breed
    tableRowId.querySelector('#sex-td').innerText = sex
  })
}
