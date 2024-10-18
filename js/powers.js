document.addEventListener("DOMContentLoaded", () => {
    const pokemonNameElement = document.getElementById("pokemonName");
    const movesList = document.getElementById("movesList");
    const abilitiesList = document.createElement("ul");
    abilitiesList.id = "abilitiesList";
    abilitiesList.innerHTML = "<h3 class='habilidades'>Habilidades:</h3>";
    
    
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('name');

    if (pokemonName) {
        fetchPokemonMovesAndAbilities(pokemonName);
    }

    async function fetchPokemonMovesAndAbilities(pokemon) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
            if (!response.ok) {
                throw new Error("Pokémon não encontrado");
            }
            const data = await response.json();
            displayPokemonMovesAndAbilities(data);
        } catch (error) {
            alert(error.message);
        }
    }

    function displayPokemonMovesAndAbilities(data) {
       
        pokemonNameElement.textContent = `Nome: ${capitalizeFirstLetter(data.name)}`;

       
        const abilities = data.abilities;
        abilities.forEach(ability => {
            const abilityItem = document.createElement("li");
            abilityItem.textContent = capitalizeFirstLetter(ability.ability.name);
            abilitiesList.appendChild(abilityItem);
        });
        pokemonNameElement.parentNode.insertBefore(abilitiesList, movesList);

        const moves = data.moves.slice(0, 10); 
        moves.forEach(move => {
            const moveItem = document.createElement("li");
            moveItem.textContent = capitalizeFirstLetter(move.move.name);
            movesList.appendChild(moveItem);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
