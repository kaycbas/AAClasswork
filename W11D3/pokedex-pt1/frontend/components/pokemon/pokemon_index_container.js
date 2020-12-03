import { connect } from "react-redux";
import PokemonIndex from "./pokemon_index";
import { selectAllPokemon } from "../../reducers/selectors"
import { requestAllPokemon } from "../../actions/pokemon_actions";

const mSTP = (state) => {
    return {
        pokemon: selectAllPokemon(state)
    }
}

const mDTP = (dispatch) => {
    return {
        requestAllPokemon: () => dispatch(requestAllPokemon())
    }
}

export default connect(mSTP, mDTP)(PokemonIndex);