import { useEffect, useReducer, useState } from 'react';
import { getSavedPlayersList, savePlayersList, saveThemeSelection } from '../helpers/storage';
import { getCurrentTheme } from '../theme/themes/helpers';
import * as actionTypes from './actions';
import { appReducer } from './reducer';

function useAppState() {
  const [activePlayers, setActivePlayers] = useState([]);

  const [state, dispatch] = useReducer(appReducer, {
    theme: getCurrentTheme(),
    playersList: getSavedPlayersList(),
  });

  function setState(type, value) {
    dispatch({ type, value });
  }

  function setTheme(value) {
    saveThemeSelection(value);
    setState(actionTypes.UPDATE_THEME_SELECTION, value);
  }

  function addPlayer(player) {
    setState(actionTypes.ADD_PLAYER, player);
  }

  function deletePlayer(id) {
    setState(actionTypes.DELETE_PLAYER, id);
  }

  function makePlayerActive(id) {
    setState(actionTypes.MAKE_PLAYER_ACTIVE, id);
  }

  function removePlayer(playerId) {
    setActivePlayers((prev) => prev.filter((player) => player.id !== playerId));
  }

  // Sync state with local storage
  useEffect(() => {
    savePlayersList(state.playersList);
  }, [state.playersList]);

  return {
    state,
    setTheme,
    addPlayer,
    deletePlayer,
    removePlayer,
    makePlayerActive,
  };
}

export { useAppState };
