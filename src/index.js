let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection")
const newToyForm = document.querySelector("body > div.container > form")

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toysArr => toysArr.forEach(toy => {
      displayOneCard(toy)
    })
  )


function displayOneCard(toy){
  let newDiv = document.createElement('div')
  newDiv.classList.add('card')
  newDiv.dataset = toy.id

  let h2 = document.createElement('h2')
  h2.textContent = toy.name

  let img = document.createElement('img')
  img.src = toy.image

  let p = document.createElement('p')
  p.dataset.id = toy.id
  p.textContent = `${toy.likes} likes`

  let likeBttn = document.createElement('button')
  likeBttn.classList.add('like-btn') 
  likeBttn.dataset.id = toy.id
  likeBttn.textContent = 'Like ❤️ '
  
  newDiv.append(h2, img, p, likeBttn)
  toyCollection.append(newDiv)
  
}


newToyForm.addEventListener('submit', ev => {
  ev.preventDefault()

  const name = ev.target.name.value
  const image = ev.target.image.value
  const likes = 0

  const newToyObj = {name, image, likes}

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(newToyObj)
  })
  .then(res => res.json())
  .then(toyObj => displayOneCard(toyObj))
})


toyCollection.addEventListener('click', evt => {
  if(evt.target.matches('button.like-btn')) {
    let pTag = (evt.target.previousElementSibling)
    let pTagNum = parseInt(pTag.textContent)

  fetch (`http://localhost:3000/toys/${evt.target.dataset.id}`, {
    method: "PATCH",
    headers:
    {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify({likes: pTagNum + 1})
  })
    .then(res => res.json())
    .then(toyObj => {
      pTag.textContent = `${toyObj.likes} Likes`
    })
  }
})
 