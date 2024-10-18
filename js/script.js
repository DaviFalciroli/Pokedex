document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const pokemonInput = document.getElementById("pokemonInput");
    const pokemonInfo = document.getElementById("pokemonInfo");
    const pokemonName = document.getElementById("pokemonName");
    const pokemonImg = document.getElementById("pokemonImg");
    const pokemonId = document.getElementById("pokemonId");
    const pokemonType = document.getElementById("pokemonType");
    const pokemonHeight = document.getElementById("pokemonHeight");
    const pokemonWeight = document.getElementById("pokemonWeight");
    const powersBtn = document.getElementById("powersBtn"); 

    async function fetchPokemon(pokemon) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
            if (!response.ok) {
                throw new Error("Pokémon não encontrado");
            }
            const data = await response.json();
            displayPokemonInfo(data);
        } catch (error) {
            alert(error.message);
            clearPokemonInfo();
        }
    }

    function displayPokemonInfo(data) {
        pokemonName.textContent = `Nome: ${capitalizeFirstLetter(data.name)}`;
        pokemonImg.src = data.sprites.front_default || "assets/placeholder.png";
        pokemonId.textContent = `ID: ${data.id}`;
        pokemonType.textContent = `Tipo: ${data.types.map(type => capitalizeFirstLetter(type.type.name)).join(', ')}`;
        pokemonHeight.textContent = `Altura: ${(data.height / 10).toFixed(1)} m`;
        pokemonWeight.textContent = `Peso: ${(data.weight / 10).toFixed(1)} kg`;
        pokemonInfo.style.display = "block";

    
        powersBtn.href = `powers.html?name=${data.name}`;
    }

    function clearPokemonInfo() {
        pokemonInfo.style.display = "none";
        pokemonName.textContent = "";
        pokemonImg.src = "assets/placeholder.png";
        pokemonId.textContent = "";
        pokemonType.textContent = "";
        pokemonHeight.textContent = "";
        pokemonWeight.textContent = "";
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    searchBtn.addEventListener("click", () => {
        const pokemon = pokemonInput.value.trim();
        if (pokemon) {
            fetchPokemon(pokemon);
        }
    });

    pokemonInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            const pokemon = pokemonInput.value.trim();
            if (pokemon) {
                fetchPokemon(pokemon);
            }
        }
    });
});
