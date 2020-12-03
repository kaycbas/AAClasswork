export const selectAllPokemon = (state) => {
    return Object.values(state.entities.pokemon)
}

export const selectSinglePokemon = (state, id) => {
    return state.entities.pokemon[id];
}