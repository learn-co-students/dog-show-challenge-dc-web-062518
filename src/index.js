let id = 0

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#dog-form')
  form.addEventListener('submit', patchFetch)
  fetchAllDog()
})

function fetchAllDog(){
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(json => {
    json.forEach((dog)=> {render(dog)})})
}

function patchFetch(e){
  e.preventDefault()
  if(id > 0){
    let name = e.target.querySelectorAll('input')[0].value
    let breed = e.target.querySelectorAll('input')[1].value
    let sex = e.target.querySelectorAll('input')[2].value
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        name: name,
        breed: breed,
        sex: sex
      })
    }).then(res => res.json())
    .then(json => {editDog(json)})
  }
}

function render(dog){
  let tBody = document.querySelector('#table-body')
  let tRow = document.createElement('tr')
  let tdName = document.createElement('td')
  let tdBreed = document.createElement('td')
  let tdSex = document.createElement('td')
  let tdEdit = document.createElement('td')
  let editButton = document.createElement('button')
  tRow.id = `row-${dog.id}`
  tdName.classList.add('name')
  tdName.innerText = dog.name
  tdBreed.classList.add('breed')
  tdBreed.innerText = dog.breed
  tdSex.classList.add('sex')
  tdSex.innerText = dog.sex
  editButton.innerText = 'Edit Dog'
  editButton.addEventListener('click', fillInputs)
  tBody.appendChild(tRow)
  tRow.appendChild(tdName)
  tRow.appendChild(tdBreed)
  tRow.appendChild(tdSex)
  tRow.appendChild(tdEdit)
  tdEdit.appendChild(editButton)
}

function fillInputs(e){
  let row = e.currentTarget.parentNode.parentElement
  let name = row.querySelector('.name').innerText
  let breed = row.querySelector('.breed').innerText
  let sex = row.querySelector('.sex').innerText
  let input = document.querySelectorAll('input')
  input[0].value = name
  input[1].value = breed
  input[2].value = sex
  id = row.id.split('-')[1]
}

function editDog(json){
  let row = document.querySelector(`#row-${id}`)
  let input = row.querySelectorAll('td')
  input[0].innerText = json.name
  input[1].innerText = json.breed
  input[2].innerText = json.sex
  const form = document.querySelector('#dog-form')
  form.reset()
}
