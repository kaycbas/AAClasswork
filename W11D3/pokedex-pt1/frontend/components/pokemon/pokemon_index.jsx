import React, { Component } from "react";
import PokemonIndexItem from "./pokemon_index_item";
import PokemonDetailContainer from "./pokemon_detail_container";
import { Route } from 'react-router-dom';

class PokemonIndex extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestAllPokemon();
    }

    render () {
        const pokemonLis = this.props.pokemon.map(pokemon => {
            return (
                <PokemonIndexItem key={pokemon.id} pokemon={pokemon}/>
            )
        })
        return (
            <React.Fragment>
                <Route path="/pokemon/:pokemonId" component={PokemonDetailContainer} />
                <h1>List of Pokemon</h1>
                <ul>
                    {pokemonLis}
                </ul>
            </React.Fragment>
        )
    }
}

export default PokemonIndex;