const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="handleOpenModal(${JSON.stringify(pokemon).split('"').join("&quot;")})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function handleOpenModal(pokemon) {
    // console.log(pokemon)
    var modal = document.getElementById('modal')
    var modalContent = document.querySelector('.modal-content')

    var modalHTML = `
            <div class="modal-content">
                <div>
                    <span class="close" onclick="handleCloseModal()">&times;</span>
                </div>
                <div class="modalDetail ${pokemon.type}">
                    <span class="pokeName">${pokemon.name}</span>
                    <span class="pokeNumber">#${pokemon.number}</span>
                    <span class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </span>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                </div>                
                <div class="stats">Base Stats</div>  
                <div class="poke-detail">   
                    <div class="atkDetail">Attack: 
                        <span class="atk">${pokemon.attack}</span>
                    </div>
                    <div class="defDetail">Defense: 
                        <span class="def">${pokemon.defense}</span>
                    </div>
                    <div class="hpDetail">Hitpoints: 
                        <span class="hp">${pokemon.hp}</span>
                    </div>
                    <div class="spcAtkDetail">Special Attack: 
                        <span class="spcAtk">${pokemon.specialAttack}</span>
                    </div>
                    <div class="spcDefDetail">Special Defense: 
                        <span class="spcDef">${pokemon.specialDefense}</span>
                    </div>
                    <div class="spdDetail">Speed: 
                        <span class="spd">${pokemon.speed}</span>
                    </div>
                </div>
                <div class="about">About</div>
                <div class="aboutDetail">
                    <div class="heightDetail">Height: 
                        <span class="height">${pokemon.height}
                    </div>
                    <div class="weightDetail">Weight: 
                        <span class="weight">${pokemon.weight}
                    </div>
                </div>
            </div>
        `
        

    modalContent.innerHTML = modalHTML
    modal.style.display = 'block'   
}

function handleCloseModal() {
    var modal = document.getElementById('modal')
    modal.style.display = 'none'
}

