import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root"

//testing
import * as ApiUtil from './util/api_util';
import { receiveAllPokemon, requestAllPokemon, requestSinglePokemon } from './actions/pokemon_actions'
import configureStore from "./store/store"
import { selectAllPokemon } from "./reducers/selectors"

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  //testing
  window.store = store
  window.fetchAllPokemon = ApiUtil.fetchAllPokemon;
  window.receiveAllPokemon = receiveAllPokemon;
  window.requestAllPokemon = requestAllPokemon;
  window.selectAllPokemon = selectAllPokemon;
  window.requestSinglePokemon = requestSinglePokemon;

  const rootEl = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, rootEl);
});