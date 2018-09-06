const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let main = document.querySelector("main")

document.addEventListener("DOMContentLoaded",()=>{
// console.log("content loaded");

//make function to create card for trainers
  //populate with the fetch request
fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => json.forEach((trainer) => makeTrainer(trainer)))


function makeTrainer(trainer) {
//create a element for trainer
  let trainerContainer = document.createElement("div")
  trainerContainer.className = "card"
  trainerContainer.setAttribute("data-id", trainer.id)
  trainerContainer.innerHTML = `
  <p>${trainer.name}</p>
  <button class="add_pokemon" id=${trainer.id}>Add Pokemon</button>
  `

  let ul = document.createElement("ul")
  ul.setAttribute("data-id", trainer.id)
  ul.className = "pokemonListIndent"

  trainer.pokemons.forEach(function (pokemon) {
    let bulletPoint = document.createElement("li")
    let releaseButton = document.createElement("button")
    releaseButton.className = "release"
    releaseButton.setAttribute("data-id", pokemon.id)
    releaseButton.innerText = "Release Pokemon"
    bulletPoint.innerText = `${pokemon.nickname}(${pokemon.species})`
    bulletPoint.append(releaseButton)
    let releasePokemon = bulletPoint.querySelector(".release")
    releasePokemon.addEventListener("click", deletePokemon)
    return ul.append(bulletPoint)
  })

  trainerContainer.append(ul)

  let addPokemon = trainerContainer.querySelector(".add_pokemon")
  addPokemon.addEventListener('click', addNewPokemon)
  return main.append(trainerContainer)
// this ends makeTrainer
}

function addNewPokemon(event) {
  let trainerId = event.target.parentNode.getAttribute("data-id")
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      trainer_id: trainerId
    })
  })
  .then(resp => resp.json())
  .then(json => addPokemonToTrainer(json))
}

function deletePokemon(event) {
  //find the pokemon to delete which is attached to the button
  let deletePokemon = event.target.getAttribute("data-id")
  fetch(`http://localhost:3000/pokemons/${deletePokemon}`, {
    method: "DELETE"
  })
  event.target.parentNode.remove()
}

function addPokemonToTrainer(pokemon) {
  console.log(pokemon.trainer_id)
  let trainersUl = document.querySelector(`[data-id="${pokemon.trainer_id}"] ul`)
  // console.log(trainersUl)
  let newbulletPoint = document.createElement("li")
  let newReleaseButton = document.createElement("button")
  newReleaseButton.className = "release"
  newReleaseButton.setAttribute("data-id", pokemon.id)
  newReleaseButton.innerText = "Release Pokemon"
  let newBulletPoint = document.createElement("li")
  newBulletPoint.innerText = `${pokemon.nickname}(${pokemon.species})`
  newBulletPoint.append(newReleaseButton)
  trainersUl.append(newBulletPoint)
  return trainersUl
}
















//this closes the document event listener
})
