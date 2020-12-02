import React from 'react';
import ReactDOM from 'react-dom';
import * as ApiUtil from './util/api_util';
import { receiveAllPokemon, requestAllPokemon } from './actions/pokemon_actions'
import configureStore from "./store/store"

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  //testing
  window.store = store
  window.fetchAllPokemon = ApiUtil.fetchAllPokemon;
  window.receiveAllPokemon = receiveAllPokemon;
  window.requestAllPokemon = requestAllPokemon;

  const rootEl = document.getElementById('root');
  ReactDOM.render(<h1>Pokedex</h1>, rootEl);
});