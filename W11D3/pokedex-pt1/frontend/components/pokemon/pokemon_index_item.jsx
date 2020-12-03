import React from "react";
import { Link } from "react-router-dom";

const PokemonIndexItem = ({ pokemon: { id, name, imageUrl } }) => {
    return (
        <Link to={`/pokemon/${id}`}>
            <li>
                {name}
                <img src={imageUrl}></img>
            </li>
        </Link>
    )
}

export default PokemonIndexItem;

