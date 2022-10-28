document.querySelector("#search").addEventListener("click", getPokemon);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function getPokemon(e) {
  const name = document.querySelector("#pokemonName").value;
  const pokemonName = lowerCaseName(name);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".pokemon").innerHTML = `
      <div class="pokemon">
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon name"
        />
        <h3>${capitalizeFirstLetter(data.name)}</h3>
        <p>Weight: ${data.weight} lbs</p>
        <p>height: ${data.height}0 cm</p>
        <p>Type: ${data.types[0].type.name}</p>
        <p>Ability: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}</p>
        <p>PokeDex # ${data.id}</p>
      </div>`
    })
    .catch((err) => {
      document.querySelector(".pokemon").innerHTML = `
      <h4>error 404 Pokemon not found 😞</h4>
      `;
      console.log("Pokemon not found", err);
    });

  e.preventDefault();
}
