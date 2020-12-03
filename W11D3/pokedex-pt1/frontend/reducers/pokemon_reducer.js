import { RECEIVE_ALL_POKEMON, RECEIVE_SINGLE_POKEMON } from '../actions/pokemon_actions';

const pokemonReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_ALL_POKEMON:
            return action.pokemon;
        case RECEIVE_SINGLE_POKEMON:
            let nextState = Object.assign({}, state);
            nextState[action.payload.pokemon.id] = action.payload.pokemon
            return nextState;
        default:
            return state
    }
}

export default pokemonReducer;