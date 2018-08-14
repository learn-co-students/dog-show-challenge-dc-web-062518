let editFormInputs

document.addEventListener('DOMContentLoaded', () => {
  fetchAll()
  const editForm = document.querySelector('#dog-form')
  editFormInputs = editForm.querySelectorAll('input')
  editForm.addEventListener('submit', updateDog)
})

function fetchAll() {
  fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(json => {
      json.forEach(element => {render(element)})
    })
}

function render(element) {
  let tbody = document.querySelector('#table-body')
  let tr = document.createElement('tr')
  let nametd = document.createElement('td')
  let breedtd = document.createElement('td')
  let sextd = document.createElement('td')
  let buttontd = document.createElement('td')
  let editButton = document.createElement('button')

  nametd.innerText = element.name
  breedtd.innerText = element.breed
  sextd.innerText = element.sex
  editButton.innerText = "Edit Dog"

  editButton.addEventListener('click', populateForm)

  tr.id = `dog-${element.id}`
  tr.appendChild(nametd)
  tr.appendChild(breedtd)
  tr.appendChild(sextd)
  tr.appendChild(buttontd)
  buttontd.appendChild(editButton)
  tbody.appendChild(tr)
}

function populateForm(event) {
  let tr = event.currentTarget.parentNode.parentNode
  let id = tr.id.split("-")[1]
  let tds = tr.querySelectorAll('td')
  editFormInputs[0].value = id
  editFormInputs[1].value = tds[0].innerText
  editFormInputs[2].value = tds[1].innerText
  editFormInputs[3].value = tds[2].innerText
}

function updateDog(event) {
  event.preventDefault()
  let id = editFormInputs[0].value
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: editFormInputs[1].value,
      breed: editFormInputs[2].value,
      sex: editFormInputs[3].value
    })
  })
    .then(res => res.json())
    .then(json => {
      let tds = document.querySelector(`#dog-${id}`).querySelectorAll('td')
      tds[0].innerText = json.name
      tds[1].innerText = json.breed
      tds[2].innerText = json.sex
      document.querySelector('#dog-form').reset()
    })


}
