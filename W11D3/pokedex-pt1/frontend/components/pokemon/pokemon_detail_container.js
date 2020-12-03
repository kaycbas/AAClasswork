import { connect } from "react-redux";
import PokemonDetail from "./pokemon_detail";
import { selectSinglePokemon } from "../../reducers/selectors"
import { requestSinglePokemon } from "../../actions/pokemon_actions";

const mSTP = (state, ownProps) => {
    const id = ownProps.match.params.pokemonId
    return {
        pokemon: selectSinglePokemon(state, id)
    }
}

const mDTP = (dispatch) => {
    return {
        requestSinglePokemon: (id) => dispatch(requestSinglePokemon(id))
    }
}

export default connect(mSTP, mDTP)(PokemonDetail);