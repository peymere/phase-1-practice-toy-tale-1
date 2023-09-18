let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
//RENDER CARDS//
function renderToyCard(toy){
  // create toy elements
  const card = document.createElement("div");
  card.className = "card";
  //name
  const h2 = document.createElement('h2');
  h2.textContent = toy.name;
  card.appendChild(h2);
  //image
  const img = document.createElement("img");
  img.src = toy.image;
  img.alt = toy.name;
  img.className = 'toy-avatar';
  card.appendChild(img);
  //like count
  const p = document.createElement("p");
  //p.textcontent = toy.likes;
  p.innerText = `Like Count: ${toy.likes}` 
  card.appendChild(p);
  //like button
  const button = document.createElement("button");
  button.className = "like-btn";
  button.id = toy.id;
  button.innerText = "Like ❤️"
  card.appendChild(button);
  
  //LIKE BUTTON EVENT
  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes+= 1
    card.querySelector('p').textContent = `Like Count: ${toy.likes}`
    updateLikes(toy)
  })

  //ADD TOY CARD TO DOM
  const toyCollection = document.getElementById('toy-collection')
  toyCollection.appendChild(card)
  //console.log(card)
}

////TOY FORM EVENT LISTENER
document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)
//TOY FORM EVENT HANDLER
function handleSubmit(e){
e.preventDefault()
let newToy = {
  name:e.target.name.value,
  image:e.target.image.value,
  likes: 0
}
addNewToy(newToy)
}

/////       FETCH REQUESTS        /////
//FETCH GET TOY DATA FROM JSON//
function getAllToys(){
fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(toyData => toyData.forEach(toy => renderToyCard(toy)))
}
//FETCH POST ADD NEW TOY
function addNewToy(newToy){
fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body:JSON.stringify(newToy)
})
.then(response => response.json())
.then(newToy => console.log(newToy))

}

//FETCH PATCH NEW TOY LIKES//
function updateLikes(toy){
fetch('http://localhost:3000/toys/' + toy.id, {
 method: 'PATCH',
 headers: {
  "Content-Type": "application/json",
  Accept: "application/json"
},  
body: JSON.stringify({
  "likes": toy.likes
}) 
})
}

//INITIALIZE ALL FUNCTIONS
function initialize(){
getAllToys('http://localhost:3000/toys')
}
initialize()