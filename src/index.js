
 function createDogTable() {
  return document.querySelector("#table-body")
}
function createDogForm() {
  return document.querySelector('#dog-form')
}

document.addEventListener('DOMContentLoaded', () => {

  getDogs()

  const dogForm = createDogForm()

  dogForm.addEventListener('submit',()=>{
    submitEditClickHandler(event)
  })
})


function getDogs(event) {
  fetch(`http://localhost:3000/dogs`)
  .then(r => r.json())
  .then(json=>{
    json.forEach(dog=>{renderDogs(dog)})
  })
}

function renderDogs(dog) {
  let tr = document.createElement('tr')
  let tdName = document.createElement('td')
  let tdBreed = document.createElement('td')
  let tdSex = document.createElement('td')
  let button = createEditButton(dog)
  console.log(button)
  tdName.innerHTML = dog.name
  tdBreed.innerHTML = dog.breed
  tdSex.innerHTML = dog.sex

  tr.appendChild(tdName)
  tr.appendChild(tdBreed)
  tr.appendChild(tdSex)
  tr.appendChild(button)
  tr.id = `dog-${dog.id}`


  let dogTable = createDogTable()
  dogTable.appendChild(tr)
}

function createEditButton(dog) {
  let button = document.createElement('button')

  button.innerText = 'EDIT'
  button.addEventListener('click',()=>{
    populateEditForm(dog)
  })
  return button;
}

function populateEditForm(dog){
  let dogForm = createDogForm();
  dogForm.reset()

  dogForm.elements.namedItem('name').value = dog.name
  dogForm.elements.namedItem('breed').value = dog.breed
  dogForm.elements.namedItem('sex').value = dog.sex
  dogForm.elements.namedItem('id').value = dog.id
}

function submitEditClickHandler(event) {
  event.preventDefault();
  dogEls = document.querySelectorAll('input')
  console.log(dogEls[0].value)
  let name = dogEls[0].value
  let breed = dogEls[1].value
  let sex = dogEls[2].value
  let id = dogEls[3].value
  console.log(id)

  editDogs(name,breed,sex,id)
}

function getTr(id){
  return document.getElementById(`dog-${id}`)
}

function editDogs(name,breed,sex,id) {

  fetch(`http://localhost:3000/dogs/${id}`,{
    'method': 'PATCH',
      headers:{
        "Content-Type": "application/json"
      },
      "body":JSON.stringify({
        name: name,
        breed: breed,
        sex: sex
      })
  })
  .then(res=> res.json())
  .then(json=>{
    let tr = getTr(id)
    let arr = tr.querySelectorAll('td')

    arr[0].innerHTML = name
    arr[1].innerHTML = breed
    arr[2].innerHTML = sex
  })
}
