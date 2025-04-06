const form = document.getElementById("form");
const cardContainer = document.getElementById("cardContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("pokemonName").value.toLowerCase();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    displayCard(data);
  } catch (err) {
    cardContainer.innerHTML = `<p>Pokémon not found. Please try again!</p>`;
  }
});

function displayCard(pokemon) {
  const types = pokemon.types
    .map((type) => `<span class="type" style="background-color: ${getTypeColor(type.type.name)}">${type.type.name}</span>`)
    .join("");

  const stats = pokemon.stats
    .slice(0, 3)
    .map((stat) => `<div class="stat"><strong>${stat.base_stat}</strong><br>${stat.stat.name}</div>`)
    .join("");

  cardContainer.innerHTML = `
    <div class="card">
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" />
      <h2>${pokemon.name}</h2>
      <div class="types">${types}</div>
      <div class="stats">${stats}</div>
    </div>
  `;
}

function getTypeColor(type) {
  const colors = {
    fire: "#fd7d24",
    grass: "#9bcc50",
    electric: "#eed535",
    water: "#4592c4",
    ground: "#ab9842",
    rock: "#a38c21",
    fairy: "#fdb9e9",
    poison: "#b97fc9",
    bug: "#729f3f",
    dragon: "#53a4cf",
    psychic: "#f366b9",
    flying: "#3dc7ef",
    fighting: "#d56723",
    normal: "#a4acaf",
    ice: "#51c4e7",
    ghost: "#7b62a3",
    dark: "#707070",
    steel: "#9eb7b8",
  };
  return colors[type] || "#777";
}
