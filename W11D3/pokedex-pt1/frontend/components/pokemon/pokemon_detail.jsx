import React, { Component } from "react";
// import { Link } from "react-router-dom";

class PokemonDetail extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const id = this.props.match.params.pokemonId;
        this.props.requestSinglePokemon(id)
    }

    // componentDidUpdate(prevProps) {
    //     const id = this.props.match.params.pokemonId;
    //     if (prevProps.match.params.pokemonId !== id) {
    //         this.props.requestSinglePokemon(id)
    //     }
    // }

    render() {
        if (this.props.pokemon) {
            return (
                <h1>{this.props.pokemon.type}</h1>
            )
        } else {
            return (
                <h1>No pokemon loaded</h1>
            )
        }

    }
}

export default PokemonDetail;

